import { createI18n } from '@inlang/paraglide-sveltekit'
import type { Reroute } from '@sveltejs/kit'

import * as runtime from '$lib/paraglide/runtime'

// import { i18n } from '$lib/i18n'

// Bypass i18n for /api routes
export const reroute: Reroute = (event) => {
  if (event.url.pathname.startsWith('/api') || event.url.pathname.endsWith('.pdf')) return

  return createI18n(runtime, { prefixDefaultLanguage: 'always' }).reroute()(event)
}
