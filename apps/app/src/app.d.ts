import type { ParaglideLocals } from '@inlang/paraglide-sveltekit'

import type { Me } from '$lib/server/auth'

import type { AvailableLanguageTag } from './lib/paraglide/runtime'

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      internalReferer: URL
      paraglide: ParaglideLocals<AvailableLanguageTag>
      user: Me['user']
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {}
