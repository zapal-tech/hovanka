import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ depends }) => {
  // This tells SvelteKit to re-run this load function when the language changes
  depends('paraglide:lang')
}
