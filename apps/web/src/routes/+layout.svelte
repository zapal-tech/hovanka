<script>
  // import { i18n } from '$lib/i18n'
  import { createI18n, ParaglideJS } from '@inlang/paraglide-sveltekit'
  import { pwaAssetsHead } from 'virtual:pwa-assets/head'
  import { pwaInfo } from 'virtual:pwa-info'

  import * as runtime from '$lib/paraglide/runtime'

  import '../app.css'

  import { PUBLIC_GTAG_ID } from '$env/static/public'

  const webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : ''

  const { children } = $props()
</script>

<svelte:head>
  <!-- Google tag (gtag.js) -->
  <script async src={`https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GTAG_ID}`}></script>
  <script>
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    gtag('js', new Date())

    gtag('config', PUBLIC_GTAG_ID)
  </script>

  {@html webManifestLink}
  {#if pwaAssetsHead.themeColor}
    <meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
  {/if}
  {#each pwaAssetsHead.links as link}
    <link {...link} />
  {/each}
</svelte:head>

<ParaglideJS i18n={createI18n(runtime, { prefixDefaultLanguage: 'always', exclude: [/^\/api\/.*/, /\.pdf$/] })}>
  {@render children()}
</ParaglideJS>
