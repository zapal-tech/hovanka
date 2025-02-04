import { redirect } from '@sveltejs/kit'

import type { User } from '@api-types'

import { getMe } from '../api'

export type Me = {
  user: User | null
  token?: string
}

export const getCurrentUser = async ({
  nullUserRedirect,
  validUserRedirect,
  headers,
}: {
  nullUserRedirect?: string | URL
  validUserRedirect?: string | URL
  headers: Headers
}): Promise<Me> => {
  const userData = await getMe({ headers })

  if (!userData) {
    if (nullUserRedirect) redirect(307, nullUserRedirect)

    return { user: null }
  }

  const { user, token } = userData

  if (validUserRedirect && user) redirect(307, validUserRedirect)
  if (nullUserRedirect && !user) redirect(307, nullUserRedirect)

  return { user, token }
}
