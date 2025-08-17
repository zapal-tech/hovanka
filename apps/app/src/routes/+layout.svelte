<script lang="ts">
  // import { i18n } from '$lib/i18n'
  import { createI18n, ParaglideJS } from '@inlang/paraglide-sveltekit'
  import { pwaAssetsHead } from 'virtual:pwa-assets/head'
  import { pwaInfo } from 'virtual:pwa-info'

  import * as runtime from '$lib/paraglide/runtime'

  import '../app.css'

  import { onMount } from 'svelte'

  import { PUBLIC_GTAG_ID } from '$env/static/public'

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
  <!-- Google tag (gtag.js) -->
  <script async src={`https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GTAG_ID}`}></script>
  {@html `<script>
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    gtag('js', new Date())

    gtag('config', '${PUBLIC_GTAG_ID}')
  </script>`}

  {@html webManifestLink}
  {#if pwaAssetsHead.themeColor}
    <meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
  {/if}
  {#each pwaAssetsHead.links as link}
    <link {...link} />
  {/each}

  {@html `<!-- Meta Pixel Code -->
  <script>
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    fbq('init', '1672953636581004')
    fbq('track', 'PageView')
  </script>
  <noscript
    ><img
      height="1"
      width="1"
      style="display: none"
      src="https://www.facebook.com/tr?id=1672953636581004&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Meta Pixel Code -->`}
</svelte:head>

<ParaglideJS i18n={createI18n(runtime, { prefixDefaultLanguage: 'always', exclude: [/^\/api\/.*/, /\.pdf$/, '/sw.js'] })}>
  {@render children()}
</ParaglideJS>
