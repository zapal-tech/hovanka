<script lang="ts">
  import { onDestroy } from 'svelte'
  import { createPopover } from 'svelte-headlessui'

  import { PUBLIC_APP_DOMAIN } from '$env/static/public'
  import * as m from '$lib/paraglide/messages'

  import Button from './button.svelte'
  import Container from './container.svelte'
  import ChevronUpIcon from './icons/chevron-up.svelte'
  import MenuIcon from './icons/menu.svelte'
  import LanguageSwitcher from './language-switcher.svelte'
  import Logo from './logo.svelte'
  import NavLinks from './nav-links.svelte'

  const popover = createPopover()

  let isOpen = $state(false)

  const unsubscribe = popover.subscribe(({ expanded }) => (isOpen = expanded))

  onDestroy(() => {
    unsubscribe()
  })
</script>

<header>
  <nav>
    <Container class="relative z-50 mx-auto flex max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8">
      <div class="relative z-10 flex items-center gap-16">
        <a href="/" aria-label="Home">
          <Logo class="h-9 w-auto" />
        </a>

        <div class="hidden lg:flex lg:gap-10">
          <NavLinks />
        </div>
      </div>

      <div class="flex items-center gap-6">
        <div class="lg:hidden">
          <button
            onclick={() => (isOpen ? popover.close : popover.open)()}
            class="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-green-900 p-2 hover:bg-green-200/50 hover:stroke-green-600 active:stroke-green-900"
            aria-label="Toggle site navigation"
          >
            {#if isOpen}
              <ChevronUpIcon class="h-6 w-6" />
            {:else}
              <MenuIcon class="h-6 w-6" />
            {/if}
          </button>
          {#if isOpen}
            <div use:popover.panel class="fixed inset-0 z-0 bg-green-300/60 backdrop-blur"></div>
            <div
              use:popover.panel
              class="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-green-50 px-6 pt-32 pb-6 shadow-2xl shadow-green-900/20"
            >
              <div class="space-y-4">
                <a use:popover.button class="block text-base leading-7 tracking-tight text-green-700" href="/#features"
                  >{m.nav_features()}</a
                >
                <a use:popover.button class="block text-base leading-7 tracking-tight text-green-700" href="/#pricing"
                  >{m.nav_pricing()}</a
                >
                <a use:popover.button class="block text-base leading-7 tracking-tight text-green-700" href="/#faqs"
                  >{m.nav_faqs()}</a
                >
              </div>
              <LanguageSwitcher class="mt-8" />
              <div class="mt-8 flex flex-col gap-4">
                <Button href={`https://${PUBLIC_APP_DOMAIN}/sign-in`} variant="outline">{m.sign_in()}</Button>
                <Button href={`https://${PUBLIC_APP_DOMAIN}`}>{m.try_it_out()}</Button>
              </div>
            </div>
          {/if}
        </div>

        <LanguageSwitcher class="mr-4 hidden lg:flex" />

        <Button href={`https://${PUBLIC_APP_DOMAIN}/sign-in`} target="_blank" variant="outline" class="hidden! lg:block!"
          >{m.sign_in()}</Button
        >
        <Button href={`https://${PUBLIC_APP_DOMAIN}`} target="_blank" class="hidden! lg:block!">{m.try_it_out()}</Button>
      </div>
    </Container>
  </nav>
</header>
