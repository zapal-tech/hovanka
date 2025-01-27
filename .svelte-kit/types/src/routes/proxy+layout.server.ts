// @ts-nocheck
import type { LayoutServerLoad } from './$types'

export const prerender = true

export const load = ({ depends }: Parameters<LayoutServerLoad>[0]) => {
  // This tells SvelteKit to re-run this load function when the language changes
  depends('paraglide:lang')
}
