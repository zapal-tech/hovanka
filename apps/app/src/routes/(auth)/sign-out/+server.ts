import { tokenCookieName } from '@hovanka/shared/cookies'

import { PUBLIC_DOMAIN } from '$env/static/public'

export const GET = async ({ cookies }) => {
  cookies.delete(tokenCookieName, { path: '/', domain: `.${PUBLIC_DOMAIN}` })

  return new Response(null, { status: 307, headers: { location: '/sign-in' } })
}
