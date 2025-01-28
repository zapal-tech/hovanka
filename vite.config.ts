import { paraglide } from '@inlang/paraglide-sveltekit/vite'
import { enhancedImages } from '@sveltejs/enhanced-img'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    allowedHosts: true,
  },
  plugins: [
    paraglide({ project: './project.inlang', outdir: './src/lib/paraglide' }),
    enhancedImages(),
    sveltekit(),
    tailwindcss(),
  ],
})
