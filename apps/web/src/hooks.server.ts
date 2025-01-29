import { createI18n } from '@inlang/paraglide-sveltekit'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

import * as runtime from '$lib/paraglide/runtime'

// import { i18n } from '$lib/i18n'

// const preloadFonts: Handle = ({ event, resolve }) =>
//   resolve(event, {
//     preload: ({ type }) => type === 'font' || type === 'js' || type === 'css',
//   })

const i18nHandle: Handle = (data) => {
  if (data.event.url.pathname.startsWith('/api')) return data.resolve(data.event)

  return createI18n(runtime, { prefixDefaultLanguage: 'always' }).handle({
    langPlaceholder: '%i18n.lang%',
    textDirectionPlaceholder: '%i18n.dir%',
  })(data)
}

export const handle = sequence(/* preloadFonts, */ i18nHandle)
