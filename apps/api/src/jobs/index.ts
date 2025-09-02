import { Config } from 'payload'

import { Collection } from '@hovanka/shared/types/index'

import { EmotionsStatistic } from '@api/types/generated-types'

export const jobsConfig: Config['jobs'] = {
  tasks: [
    {
      label: 'Collecting emotion statistics',
      retries: 3,
      slug: 'emotion-statistics',
      handler: async ({ req: { payload } }) => {
        const emotionsList = (
          await payload.find({
            collection: Collection.Emotions,
            limit: 1000,
            depth: 1,
          })
        ).docs

        const users = (
          await payload.find({
            collection: Collection.Users,
            limit: 1000,
            depth: 1,
            select: {
              journalNotes: true,
              emotionsStatistics: true,
            },
            joins: {
              journalNotes: {
                where: {
                  and: [
                    {
                      emotions: {
                        exists: true,
                      },
                    },
                    {
                      createdAt: {
                        greater_than_equal: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 2).toISOString(),
                      },
                    },
                    {
                      createdAt: {
                        less_than: new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString(),
                      },
                    },
                  ],
                },
                limit: 200,
                sort: '-createdAt',
              },
              emotionsStatistics: {
                limit: 1,
                sort: '-createdAt',
                where: {
                  createdAt: {
                    greater_than_equal: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 3).toISOString(),
                  },
                },
              },
            },
          })
        ).docs

        for (const user of users) {
          if (!user?.emotionsStatistics?.docs || !user?.journalNotes?.docs || !user.journalNotes.docs.length) continue

          let existEmotions: boolean = false
          const emotionCountMap: Record<string, number> = {}

          user.journalNotes?.docs?.map((note) => {
            if (typeof note !== 'object') return

            if (note.emotions) {
              if (typeof note.emotions === 'object' && 'id' in note.emotions && note.emotions.id)
                emotionCountMap[note.emotions.id.toString()] = (emotionCountMap[note.emotions.id.toString()] || 0) + 1
              else emotionCountMap[note.emotions.toString()] = (emotionCountMap[note.emotions.toString()] ?? 0) + 1
              existEmotions = true
            }
          })

          if (!existEmotions) continue

          const emotionsArray: NonNullable<EmotionsStatistic['statistics']> = []

          Object.entries(emotionCountMap).forEach(([emotionId, count]) => {
            const emotionChild = emotionsList.filter((e) => e.id === Number(emotionId))[0]
            const emotionParent =
              emotionChild && emotionChild?.parent && typeof emotionChild?.parent === 'object' && emotionChild.parent?.emotion
                ? emotionChild.parent
                : null

            if (emotionChild?.emotion)
              emotionsArray.push({
                emotion: emotionChild.emotion,
                count,
              })
            if (emotionParent?.emotion)
              emotionsArray.push({
                emotion: emotionParent.emotion,
                count,
              })
          })

          if (emotionsArray.length === 0) continue

          await payload.create({
            collection: Collection.EmotionsStatistics,
            data: {
              user: user.id,
              statistics: emotionsArray.sort((a, b) => b.count - a.count),
            },
            depth: 0,
          })
        }
        console.log('Emotions statistics job done')

        await payload.jobs.queue({ task: 'emotion-statistics', queue: 'every-month', input: {} })

        return { output: {} }
      },
    },
  ],
  autoRun: [
    {
      // Every month on first day at 00:00
      cron: '0 0 1 * *',
      queue: 'every-month',
    },
  ],
}
