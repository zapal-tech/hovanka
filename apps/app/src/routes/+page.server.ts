import { getMe } from '$lib/server/auth'

export const load = async ({ cookies, request: { headers } }) => {
  const { user } = await getMe({ cookies, headers })

  return { user }
}
