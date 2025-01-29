import { createI18n } from '@inlang/paraglide-sveltekit'
import type { Reroute } from '@sveltejs/kit'

import { PUBLIC_WEB_APP_DOMAIN } from '$env/static/public'
import * as runtime from '$lib/paraglide/runtime'
import { splitPath } from '$lib/utils'

// import { i18n } from '$lib/i18n'

// Bypass i18n for /api routes
export const reroute: Reroute = (event) => {
  if (event.url.pathname.startsWith('/api')) return
  if (event.url.hostname === PUBLIC_WEB_APP_DOMAIN) {
    const [localeOrSegment, segment, ...rest] = splitPath(event.url.pathname)

    event.url.pathname = `${['en', 'uk'].includes(localeOrSegment || '') ? `/${localeOrSegment}` : ''}/poc/${segment === 'poc' ? '' : `${segment}/`}${rest.join('/')}`
  }

  return createI18n(runtime, { prefixDefaultLanguage: 'always' }).reroute()(event)
}
