import type { RequestHandler } from '@sveltejs/kit'

import { PUBLIC_WEB_APP_DOMAIN } from '$env/static/public'

// Redirect to app host
export const GET: RequestHandler = async () =>
  new Response(null, {
    status: 302,
    headers: { location: `https://${PUBLIC_WEB_APP_DOMAIN}/sign-up` },
  })
