<script lang="ts">
  import Container from '$lib/components/container.svelte'
  import Layout from '$lib/components/layouts/default.svelte'
  import * as m from '$lib/paraglide/messages'

  let { children } = $props()
</script>

<svelte:head>
  <meta name="description" content={m.description()} />
</svelte:head>

<Layout>
  <Container>
    {@render children()}
  </Container>
</Layout>
