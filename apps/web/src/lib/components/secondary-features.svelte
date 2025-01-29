<script lang="ts">
  import type { Component } from 'svelte'

  import * as m from '$lib/paraglide/messages'

  import Container from './container.svelte'

  interface Feature {
    name: string
    description: string
    icon: Component
  }

  export let features: Feature[] = []
</script>

<section id="features" aria-label="Features for building a portfolio" class="py-20 sm:py-32">
  <Container>
    <div class="mx-auto max-w-2xl sm:text-center">
      <h2 class="text-3xl font-medium tracking-tight text-green-900">{m.secondary_features_title()}</h2>
      <p class="mt-2 text-lg text-green-600">
        {m.secondary_features_description()}
      </p>
    </div>
    <ul
      role="list"
      class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
    >
      {#each features as feature}
        <li class="rounded-2xl border border-green-200 p-8">
          <svelte:component this={feature.icon} class="h-8 w-8" />
          <h3 class="mt-6 font-semibold text-green-900">{feature.name}</h3>
          <p class="mt-2 text-green-700">{feature.description}</p>
        </li>
      {/each}
    </ul>
  </Container>
</section>
