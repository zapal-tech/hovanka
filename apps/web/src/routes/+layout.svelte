<script>
  // import { i18n } from '$lib/i18n'
  import { createI18n, ParaglideJS } from '@inlang/paraglide-sveltekit'
  import { pwaAssetsHead } from 'virtual:pwa-assets/head'
  import { pwaInfo } from 'virtual:pwa-info'

  import * as runtime from '$lib/paraglide/runtime'

  import '../app.css'

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
