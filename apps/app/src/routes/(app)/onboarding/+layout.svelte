<script lang="ts">
  import PageTransition from '$lib/components/page-transition.svelte'

  const { data, children } = $props()
</script>

<main class="h-dvh overflow-hidden bg-gradient-to-b from-green-100 to-green-50">
  <PageTransition pathname={data.pathname}>
    {@render children()}
  </PageTransition>
</main>
