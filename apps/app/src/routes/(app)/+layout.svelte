<script lang="ts">
  import Tabs from '$lib/components/app/tabs.svelte'

  const { children } = $props()
</script>

<main class="h-dvh bg-gradient-to-b from-green-200 via-emerald-200 to-green-100 p-8">
  {@render children()}
</main>

<Tabs />
