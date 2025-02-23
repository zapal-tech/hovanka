<script lang="ts">
  import * as m from '$lib/paraglide/messages'

  // import AppStoreLink from './app-store-link.svelte'
  import CircleBackground from './circle-background.svelte'
  import Container from './container.svelte'

  // import PlayStoreLink from './play-store-link.svelte'
</script>

<section class="relative overflow-hidden bg-green-900 py-20 sm:py-28">
  <!-- <div class="absolute top-1/2 left-20 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
    <CircleBackground color="#fff" class="animate-spin-slower" />
  </div> -->
  <Container class="relative">
    <div class="mx-auto max-w-md sm:text-center">
      <h2 class="text-3xl font-medium tracking-tight text-white sm:text-4xl">{m.cta_title()}</h2>
      <p class="mt-4 text-lg text-green-300">{m.cta_description()}</p>
      <!-- <div class="mt-8 flex justify-center gap-x-6 gap-y-4">
        <PlayStoreLink color="white" />
        <AppStoreLink color="white" />
      </div> -->
    </div>
  </Container>
</section>
