import { CollectionConfig } from 'payload'

import { Collection, CollectionLabel } from '@hovanka/shared/types'

import { anyone, rootUsers } from '@api/access'

import { emotionsSelect } from '../Emotions/emotionsSelect'

export const EmotionsStatistics: CollectionConfig = {
  slug: Collection.EmotionsStatistics,
  labels: CollectionLabel.EmotionsStatistics,
  timestamps: true,
  access: {
    read: anyone,
    create: rootUsers,
    update: rootUsers,
    delete: rootUsers,
  },
  fields: [
    {
      type: 'relationship',
      name: 'user',
      label: {
        en: 'User',
        uk: 'Користувач',
      },
      required: true,
      relationTo: Collection.Users,
    },
    {
      type: 'array',
      name: 'statistics',
      label: {
        en: 'Statistics',
        uk: 'Статистика',
      },
      labels: {
        singular: {
          en: 'Statistic',
          uk: 'Статистика',
        },
        plural: {
          en: 'Statistics',
          uk: 'Статистика',
        },
      },
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            emotionsSelect(),
            {
              type: 'number',
              name: 'count',
              label: {
                en: 'Count',
                uk: 'Кількість',
              },
              required: true,
              min: 1,
            },
          ],
        },
      ],
    },
  ],
}
