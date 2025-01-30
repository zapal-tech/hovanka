<script lang="ts">
  import type { Me } from '$lib/server/auth'

  // Get props from page.server.ts
  export let user: Me['user']
</script>

{#if user}
  <h1>Hi, {user.firstName}!</h1>
{:else}
  <h1>Hi, there!</h1>
{/if}
