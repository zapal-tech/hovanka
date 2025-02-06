import { paraglide } from '@inlang/paraglide-sveltekit/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    paraglide({ project: './project.inlang', outdir: './src/lib/paraglide' }),
    sveltekit(),
    tailwindcss(),
    SvelteKitPWA({
      manifestFilename: 'site.webmanifest',
      manifest: {
        name: 'Hovanka - Mental Health app',
        short_name: 'Hovanka',
        description: 'Mental health app for tracking your mood and emotions',
        orientation: 'portrait',
        categories: ['health', 'mental health'],
        theme_color: '#24a684',
        background_color: '#eefbf6',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      pwaAssets: {
        config: './pwa-assets.config.ts',
      },
    }),
  ],
})
