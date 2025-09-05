<script lang="ts">
  import CallToAction from '$lib/components/call-to-action.svelte'
  import ContactUs from '$lib/components/contact-us.svelte'
  import Faqs from '$lib/components/faqs.svelte'
  import Hero from '$lib/components/hero.svelte'
  import Layout from '$lib/components/layouts/default.svelte'
  // import Pricing from '$lib/components/pricing.svelte'
  import SecondaryFeatures from '$lib/components/secondary-features.svelte'
  import Team from '$lib/components/team.svelte'
  import * as m from '$lib/paraglide/messages'
</script>

<svelte:head>
  <title>{m.name()} - {m.tagline()}</title>
  <meta name="description" content={m.description()} />
</svelte:head>

<Layout>
  <Hero />
  <CallToAction />
  <Team />
  <SecondaryFeatures />
  <!-- <Pricing /> -->
  <Faqs />
  <ContactUs />
</Layout>
