<script lang="ts">
  import type { PageProps } from './$types'

  // Get props from page.server.ts
  let { data }: PageProps = $props()
</script>

{#if data.user}
  <h1>Hi, {data.user.firstName}!</h1>
{:else}
  <h1>Hi, there!</h1>
{/if}
