import { redirect, type Cookies } from '@sveltejs/kit'
import type { Payload } from 'payload'

import { tokenCookieName } from '@hovanka/shared/cookies'

import type { User } from '@api-types'

import { me } from './api'

export type Me = {
  user: User | null
  token?: string
}

export const getMe = async ({
  nullUserRedirect,
  validUserRedirect,
  cookies,
  headers,
}: {
  nullUserRedirect?: string | URL
  validUserRedirect?: string | URL
  localApi?: Payload
  cookies: Cookies
  headers: Headers
}): Promise<Me> => {
  const token = cookies.get(tokenCookieName)

  const userData = await me({ headers })

  if (!userData) {
    if (nullUserRedirect) redirect(307, nullUserRedirect)

    return { user: null }
  }

  const { user } = userData

  if (validUserRedirect && user) redirect(307, validUserRedirect)
  if (nullUserRedirect && !user) redirect(307, nullUserRedirect)

  return { user, token }
}
