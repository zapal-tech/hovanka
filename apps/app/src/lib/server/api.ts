import type { MeOperationResult } from 'payload'

import type { User } from '@api-types'

import { PUBLIC_API_URL } from '$env/static/public'

const apiUrl = `${PUBLIC_API_URL}/api`
const authApiUrl = `${apiUrl}/users`

export const me = async ({ headers }: { headers: Headers }) => {
  headers.set('Content-Type', 'application/json')

  let data: (MeOperationResult & { user: User }) | null = null

  console.log(Object.fromEntries(headers))

  try {
    const response = await fetch(`${authApiUrl}/me`, {
      method: 'GET',
      headers: {
        ...Object.fromEntries(headers),
      },
    })

    if (!response.ok) throw new Error('Failed to get user')

    data = (await response.json()) as MeOperationResult & { user: User }
  } catch (error) {
    console.error(error)
  }

  return data
}
