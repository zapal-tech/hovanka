<script lang="ts">
  import * as m from '$lib/paraglide/messages'

  import Container from './container.svelte'
</script>

<section class=" py-20 sm:py-20">
  <Container class="flex justify-center">
    <a
      href="https://kris.hovanka.app/"
      target="_blank"
      class="px-2 py-3 text-lg whitespace-pre-line text-green-700 underline underline-offset-2 transition-colors delay-150 hover:bg-green-100 hover:text-green-900 hover:delay-0"
      ><p>{m.contact_us()}</p></a
    >
  </Container>
</section>
