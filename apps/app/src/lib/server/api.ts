import type { MeOperationResult } from 'payload'

import { tokenCookieName } from '@hovanka/shared/cookies'

import type { User } from '@api-types'

import { PUBLIC_API_URL } from '$env/static/public'

const apiUrl = `${PUBLIC_API_URL}/api`
const authApiUrl = `${apiUrl}/users`

export const me = async ({ headers }: { headers: Headers }) => {
  const token = headers.get(tokenCookieName)

  let data: (MeOperationResult & { user: User }) | null = null

  try {
    const response = await fetch(`${authApiUrl}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: token ? `${tokenCookieName}=${token}` : '',
      },
    })

    if (!response.ok) throw new Error('Failed to get user')

    data = (await response.json()) as MeOperationResult & { user: User }
  } catch (error) {
    console.error(error)
  }

  return data
}
