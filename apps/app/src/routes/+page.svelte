<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public'

  import type { PageProps } from './$types'

  // Get props from page.server.ts
  let { data }: PageProps = $props()
</script>

<span>{PUBLIC_API_URL}</span>
<span>{JSON.stringify(data)}</span>
{#if data.user}
  <h1>Hi, {data.user.firstName}!</h1>
{:else}
  <h1>Hi, there!</h1>
{/if}
