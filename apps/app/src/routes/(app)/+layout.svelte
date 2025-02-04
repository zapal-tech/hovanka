<script lang="ts">
  import Tabs from '$lib/components/app/tabs.svelte'
  import PageTransition from '$lib/components/page-transition.svelte'
  import * as m from '$lib/paraglide/messages'

  const { data, children } = $props()
</script>

<svelte:head>
  <title>{m.name()} - {m.tagline()}</title>
  <meta name="description" content={m.description()} />
</svelte:head>

<main class="h-dvh overflow-hidden bg-gradient-to-b from-green-200 via-emerald-200 to-green-100">
  <PageTransition pathname={data.pathname}>
    {@render children()}
  </PageTransition>

  <Tabs />
</main>
