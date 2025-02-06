<script lang="ts">
  // import { i18n } from '$lib/i18n'
  import { createI18n, ParaglideJS } from '@inlang/paraglide-sveltekit'
  import { pwaAssetsHead } from 'virtual:pwa-assets/head'
  import { pwaInfo } from 'virtual:pwa-info'

  import * as runtime from '$lib/paraglide/runtime'

  import '../app.css'

  import { onMount } from 'svelte'

  onMount(async () => {
    if (pwaInfo) {
      const { registerSW } = await import('virtual:pwa-register')

      registerSW({
        immediate: true,
        onRegistered(r) {
          r &&
            setInterval(() => {
              console.log('Checking for sw update')

              r.update()
            }, 60000)

          console.log(`SW Registered: ${r}`)
        },
        onRegisterError(error) {
          console.log('SW registration error', error)
        },
      })
    }
  })

  const webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : ''

  const { children } = $props()
</script>

<svelte:head>
  {@html webManifestLink}
  {#if pwaAssetsHead.themeColor}
    <meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
  {/if}
  {#each pwaAssetsHead.links as link}
    <link {...link} />
  {/each}
</svelte:head>

<ParaglideJS i18n={createI18n(runtime, { prefixDefaultLanguage: 'always' })}>
  {@render children()}
</ParaglideJS>
