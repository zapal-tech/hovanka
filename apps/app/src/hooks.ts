import { createI18n } from '@inlang/paraglide-sveltekit'
import type { Reroute } from '@sveltejs/kit'

import * as runtime from '$lib/paraglide/runtime'

export const reroute: Reroute = createI18n(runtime, {
  prefixDefaultLanguage: 'always',
  exclude: [/^\/api\/.*/, /\.pdf$/, '/sw.js'],
}).reroute()
