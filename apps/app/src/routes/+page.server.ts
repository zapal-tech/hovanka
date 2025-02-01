import { getMe } from '$lib/server/auth'

export const load = async ({ cookies, request: { headers } }) => {
  const { user, token } = await getMe({ cookies, headers })

  return {
    user,
    token,
    cookies: cookies.getAll(),
    headers: Object.fromEntries(headers),
  }
}
