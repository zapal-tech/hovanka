import { tokenCookieName } from '@hovanka/shared/cookies'

import { getMe } from '$lib/server/auth'

export const load = async ({ cookies, request: { headers } }) => {
  const { user, token } = await getMe({ cookies, headers })

  return { user, token, cookieVal: cookies.get(tokenCookieName) }
}
