<script lang="ts">
  import Footer from '../footer.svelte'
  import Header from '../header.svelte'
</script>

<Header />
<main class="flex-auto">
  <slot />
</main>
<Footer />
