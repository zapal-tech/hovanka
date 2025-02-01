import path from 'node:path'
import { fileURLToPath } from 'node:url'
import adapter from '@sveltejs/adapter-cloudflare'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      routes: {
        exclude: ['<all>'],
      },
      // fallback: 'spa',
      platformProxy: {
        persist: false,
      },
    }),
    alias: {
      '@api-types': path.resolve(__dirname, '../api/src/types/generated-types.ts'),
    },
  },
}

export default config
