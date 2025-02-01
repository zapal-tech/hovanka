import { tokenCookieName } from '@hovanka/shared/cookies'

export const GET = async ({ cookies }) => {
  cookies.delete(tokenCookieName, { path: '/' })

  return new Response(null, { status: 307, headers: { location: '/sign-in' } })
}
