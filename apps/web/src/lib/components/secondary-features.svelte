<script lang="ts">
  import type { Component } from 'svelte'

  import * as m from '$lib/paraglide/messages'

  import Container from './container.svelte'

  interface Feature {
    title: string
    description: string
    // icon: Component
  }

  const features: Feature[] = Array.from(Array(50), () => null)
    .map((_value, idx) => ({
      // icon: Container,
      title: (m as Record<string, (() => string) | undefined>)?.[`secondary_features_${idx}_title`]?.(),
      description: (m as Record<string, (() => string) | undefined>)?.[`secondary_features_${idx}_description`]?.(),
    }))
    .filter((feature) => feature.title && feature.description) as Feature[]
</script>

<section id="features" aria-label="Features for building a portfolio" class="py-20 sm:py-32">
  <Container>
    <div class="mx-auto max-w-2xl sm:text-center">
      <h2 class="text-3xl font-medium tracking-tight text-green-900">{m.secondary_features_title()}</h2>
      <p class="mt-2 text-lg whitespace-pre-line text-green-600">
        {m.secondary_features_description()}
      </p>
    </div>
    <ul
      role="list"
      class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
    >
      {#each features as feature}
        <li class="rounded-2xl border border-green-200 p-6">
          <!-- <svelte:component this={feature.icon} class="h-8 w-8 mb-6" /> -->
          <h3 class="mb-2 font-semibold text-green-900">{feature.title}</h3>
          <p class="text-green-700">{feature.description}</p>
        </li>
      {/each}
    </ul>
  </Container>
</section>
