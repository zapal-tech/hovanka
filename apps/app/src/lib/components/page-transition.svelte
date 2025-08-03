<script lang="ts">
  import type { Snippet } from 'svelte'
  import { fly } from 'svelte/transition'

  const { pathname, duration = 350, children }: { pathname: string; duration?: number; children: Snippet } = $props()
</script>

{#key pathname}
  <div in:fly={{ x: -200, duration, delay: duration }} out:fly={{ x: 200, duration }} class="h-full p-4 sm:p-8">
    {@render children()}
  </div>
{/key}
