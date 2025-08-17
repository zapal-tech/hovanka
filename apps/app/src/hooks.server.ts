import { createI18n } from '@inlang/paraglide-sveltekit'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

import { tokenCookieName } from '@hovanka/shared/cookies'

import * as runtime from '$lib/paraglide/runtime'
import { getCurrentUser } from '$lib/server/auth'

// const preloadFonts: Handle = ({ event, resolve }) =>
//   resolve(event, {
//     preload: ({ type }) => type === 'font' || type === 'js' || type === 'css',
//   })

const i18nHandle: Handle = createI18n(runtime, {
  prefixDefaultLanguage: 'always',
  exclude: [/^\/api\/.*/, /\.pdf$/, '/sw.js'],
}).handle({
  langPlaceholder: '%i18n.lang%',
  textDirectionPlaceholder: '%i18n.dir%',
})

const userHandle: Handle = async ({
  event,
  event: {
    cookies,
    request: { headers },
  },
  resolve,
}) => {
  if (cookies.get(tokenCookieName)) event.locals.user = (await getCurrentUser({ headers })).user

  return resolve(event)
}

export const handle = sequence(/* preloadFonts, */ i18nHandle, userHandle)
