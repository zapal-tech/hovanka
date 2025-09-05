<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ClassValue } from 'svelte/elements'
  import { fly } from 'svelte/transition'

  const {
    pathname,
    duration = 350,
    class: className,
    children,
  }: { pathname: string; duration?: number; class?: ClassValue; children: Snippet } = $props()
</script>

{#key pathname}
  <div in:fly={{ x: -200, duration, delay: duration }} out:fly={{ x: 200, duration }} class={['h-full p-4 sm:p-8', className]}>
    {@render children()}
  </div>
{/key}
