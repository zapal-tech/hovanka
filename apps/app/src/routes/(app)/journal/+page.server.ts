import type { Journal } from '@api-types'

import { createJournal, getJournals } from '$lib/api'

import type { Actions, PageServerLoad } from './$types'

export const actions = {
  default: async ({ request, request: { headers } }) => {
    try {
      const formData = await request.formData()
      const content = formData.get('content')

      if (!content || typeof content !== 'string') throw new Error('Content is required')

      const data = await createJournal({ content, headers })

      return data
    } catch (error) {
      console.error(error)

      return null
    }
  },
} satisfies Actions

export const load: PageServerLoad = async ({ request: { headers } }) => {
  const journalsData = await getJournals({ headers, page: 1 })

  if (!journalsData)
    return {
      journals: [] as Journal[],
      page: 1,
    }

  const { docs: journals, page, hasNextPage, nextPage } = journalsData

  return {
    journals,
    page,
    nextPage,
    hasNextPage,
  }
}
