<script lang="ts">
  import * as m from '$lib/paraglide/messages'

  import Container from './container.svelte'
</script>

<section id="team" class="overflow-hiddenpy-20 relative border-t border-green-200 sm:py-28">
  <Container class="relative">
    <h2 class="mb-8 text-center font-serif text-4xl font-semibold tracking-tight text-green-950 sm:text-4xl">
      {m.team_title()}
    </h2>

    <img src="/hovanka-team-transparent-bg.webp" alt="Hovanka team" class="mx-auto mb-4 h-auto w-full max-w-5xl" />

    <div class="flex w-full justify-center">
      <div class="max-w-3xl">
        <p class="mb-4 text-center text-lg whitespace-pre-line text-green-700">{m.team_description()}</p>
        <p class="mb-4 text-center text-lg whitespace-pre-line text-green-700">{m.team_second_description()}</p>
        <p class="text-center text-lg whitespace-pre-line text-green-700">{m.team_footer()}</p>
      </div>
    </div>
  </Container>
</section>
