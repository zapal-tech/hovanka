<script lang="ts">
  import * as m from '$lib/paraglide/messages'

  const { children } = $props()
</script>

<svelte:head>
  <title>{m.name()} - {m.tagline()}</title>
  <meta name="description" content={m.description()} />
</svelte:head>

{@render children()}
