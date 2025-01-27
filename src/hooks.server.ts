import { createI18n } from '@inlang/paraglide-sveltekit'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

import { PUBLIC_DOMAIN } from '$env/static/public'
import * as runtime from '$lib/paraglide/runtime'

// import { i18n } from '$lib/i18n'

// const preloadFonts: Handle = ({ event, resolve }) =>
//   resolve(event, {
//     preload: ({ type }) => type === 'font' || type === 'js' || type === 'css',
//   })

const redirectToWww: Handle = ({ event, resolve }) => {
  if (event.url.hostname !== PUBLIC_DOMAIN) return resolve(event)

  event.url.hostname = `www.${PUBLIC_DOMAIN}`

  return new Response(undefined, {
    status: 301,
    headers: {
      location: event.url.toString(),
    },
  })
}

const i18nHandle: Handle = (data) => {
  if (data.event.url.pathname.startsWith('/api')) return data.resolve(data.event)

  return createI18n(runtime, { prefixDefaultLanguage: 'always' }).handle({
    langPlaceholder: '%i18n.lang%',
    textDirectionPlaceholder: '%i18n.dir%',
  })(data)
}

export const handle = sequence(redirectToWww, /* preloadFonts, */ i18nHandle)
