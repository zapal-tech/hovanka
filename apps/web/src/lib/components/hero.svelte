<script lang="ts">
  import { PUBLIC_WWW_DOMAIN } from '$env/static/public'
  import logoBbc from '$lib/assets/logos/bbc.svg'
  import logoCbs from '$lib/assets/logos/cbs.svg'
  import logoCnn from '$lib/assets/logos/cnn.svg'
  import logoFastCompany from '$lib/assets/logos/fast-company.svg'
  import logoForbes from '$lib/assets/logos/forbes.svg'
  import logoHuffPost from '$lib/assets/logos/huffpost.svg'
  import logoTechCrunch from '$lib/assets/logos/techcrunch.svg'
  import logoWired from '$lib/assets/logos/wired.svg'
  import * as m from '$lib/paraglide/messages'

  // import AppDemo from './app-demo.svelte'
  // import AppStoreLink from './app-store-link.svelte'
  import Button from './button.svelte'
  import Container from './container.svelte'
  import BackgroundIllustration from './hero-background-illustration.svelte'
  import PlayIcon from './icons/play.svelte'

  // import PhoneFrame from './phone-frame.svelte'
  // import PlayStoreLink from './play-store-link.svelte'

  const logos = [
    ['Forbes', logoForbes],
    ['TechCrunch', logoTechCrunch],
    ['Wired', logoWired],
    ['CNN', logoCnn, 'hidden xl:block'],
    ['BBC', logoBbc],
    ['CBS', logoCbs],
    ['Fast Company', logoFastCompany],
    ['HuffPost', logoHuffPost, 'hidden xl:block'],
  ]
</script>

<div class="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
  <Container>
    <div class="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
      <div class="relative z-10 mx-auto w-full max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
        <h1 class="font-serif text-4xl font-semibold tracking-tight whitespace-pre-line text-green-950">{m.tagline()}.</h1>
        <p class="mt-6 text-lg whitespace-pre-line text-green-700">{m.description()}</p>
        <div class="mt-8 flex flex-wrap gap-x-6 gap-y-4">
          <!-- <PlayStoreLink />
          <AppStoreLink /> -->

          <Button
            href={`${m.hero_button_url().startsWith('/') ? `https://${PUBLIC_WWW_DOMAIN}` : ''}${m.hero_button_url()}`}
            variant="outline"
            target="_blank"
          >
            <PlayIcon class="h-6 w-6 flex-none" />
            <span class="ml-2.5">{m.hero_button_text()}</span>
          </Button>
        </div>
      </div>
      <div class="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
        <BackgroundIllustration
          class="mask-image absolute top-4 left-1/2 z-0 h-[1026px] w-[1026px] -translate-x-1/3 stroke-green-300/70 sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0"
        />
        <div
          class="mask-image -mx-4 h-[448px] px-9 sm:mx-0 lg:absolute lg:-inset-x-10 lg:-top-10 lg:-bottom-20 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32"
        >
          <img
            src="/hovanka-hero.webp"
            alt="Illustration with text: let's fuel evidence-based mental wellness together. hovanka"
            class="relative z-10 mx-auto h-auto w-full max-w-96 bg-radial from-green-50 from-60% to-transparent to-90%"
          />
          <!-- <PhoneFrame class="mx-auto max-w-[366px]" priority>
            <AppDemo />
          </PhoneFrame> -->
        </div>
      </div>
      <div class="relative -mt-4 opacity-0 select-none lg:col-span-7 lg:mt-0 xl:col-span-6" style="opacity: 0;">
        <p class="text-center text-sm font-semibold text-green-900 lg:text-left">As featured in</p>
        <ul role="list" class="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start">
          {#each logos as [name, logo, classes]}
            <li class={['flex', classes]}>
              <img src={logo} alt={name} class="h-8" />
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </Container>
</div>
