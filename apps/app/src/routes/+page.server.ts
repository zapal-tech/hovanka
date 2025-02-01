import { tokenCookieName } from '@hovanka/shared/cookies'

import { getMe } from '$lib/server/auth'

export const load = async ({ cookies, request: { headers } }) => {
  const { user, token } = await getMe({ cookies, headers })

  return {
    user,
    token,
    cookieName: tokenCookieName,
    cookieVal: cookies.get(tokenCookieName),
    headers: Object.fromEntries(headers),
  }
}
