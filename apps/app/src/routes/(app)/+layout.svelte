<script lang="ts">
  import { fly } from 'svelte/transition'

  import Tabs from '$lib/components/app/tabs.svelte'

  const { data, children } = $props()
</script>

<main class="h-dvh overflow-hidden bg-gradient-to-b from-green-200 via-emerald-200 to-green-100">
  {#key data.pathname}
    <div in:fly={{ x: -200, duration: 350, delay: 350 }} out:fly={{ x: 200, duration: 350 }} class="p-4 sm:p-8">
      {@render children()}
    </div>
  {/key}

  <Tabs />
</main>
