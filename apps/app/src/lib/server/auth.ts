import { redirect, type Cookies } from '@sveltejs/kit'
import type { Payload } from 'payload'

import type { User } from '@api-types'

import { me } from './api'

export type Me = {
  user: User | null
  token?: string
}

export const getMe = async ({
  nullUserRedirect,
  validUserRedirect,
  headers,
}: {
  nullUserRedirect?: string | URL
  validUserRedirect?: string | URL
  localApi?: Payload
  cookies: Cookies
  headers: Headers
}): Promise<Me> => {
  const userData = await me({ headers })

  if (!userData) {
    if (nullUserRedirect) redirect(307, nullUserRedirect)

    return { user: null }
  }

  const { user, token } = userData

  if (validUserRedirect && user) redirect(307, validUserRedirect)
  if (nullUserRedirect && !user) redirect(307, nullUserRedirect)

  return { user, token }
}
