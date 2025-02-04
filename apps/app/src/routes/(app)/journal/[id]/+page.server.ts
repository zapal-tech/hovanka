import { error } from '@sveltejs/kit'

import { getJournal } from '$lib/api'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params: { id }, request: { headers } }) => {
  if (!id) error(404)

  const journal = await getJournal({ headers, id: Number(id) })

  if (!journal) error(404)

  return { journal }
}
