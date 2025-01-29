<script lang="ts">
  // import { onMount } from 'svelte'

  import qrCode from '$lib/assets/qr-code.svg'
  import * as m from '$lib/paraglide/messages'

  import Button from './button.svelte'
  import Container from './container.svelte'
  import InputField from './fields/input.svelte'
  import QrCodeBorder from './icons/qr-code-border.svelte'
  import LogoMark from './logo-mark.svelte'
  import NavLinks from './nav-links.svelte'

  // let currentYear: number

  // onMount(() => {
  //   currentYear = new Date().getFullYear()
  // })
  let isLoading = $state(false)

  const handleSubmit = async (event: Event) => {
    event.preventDefault()

    isLoading = true

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const email = formData.get('email') as string

    await fetch('/api/join-waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    isLoading = false
  }
</script>

<footer class="border-t border-green-200">
  <Container>
    <div class="flex flex-col items-start justify-between gap-y-12 pt-16 pb-6 lg:flex-row lg:items-center lg:py-16">
      <div>
        <div class="flex items-center text-green-900">
          <LogoMark class="h-10 w-10 flex-none fill-green-500" />
          <div class="ml-4">
            <p class="text-base font-semibold">{m.name()}</p>
            <p class="mt-1 text-sm">{m.tagline()}.</p>
          </div>
        </div>
        <nav class="mt-11 flex gap-8">
          <NavLinks />
        </nav>
      </div>
      <!-- <div
        class="group relative -mx-4 flex items-center self-stretch p-4 transition-colors hover:bg-green-100 sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6"
      >
        <div class="relative flex h-24 w-24 flex-none items-center justify-center">
          <QrCodeBorder class="absolute inset-0 h-full w-full stroke-green-300 transition-colors group-hover:stroke-green-500" />
          <img
            src={qrCode}
            alt="QR Code for app download"
            loading="lazy"
            width="80"
            height="80"
            decoding="async"
            class="h-full w-full max-w-20 max-h-20"
          />
        </div>
        <div class="ml-8 lg:w-64">
          <p class="text-base font-semibold text-green-900">
            <a href="/" target="_blank">
              <span class="absolute inset-0 sm:rounded-2xl"></span>
              {m.download_app()}
            </a>
          </p>
          <p class="mt-1 text-sm text-green-700">{m.qr_code_description()}</p>
        </div>
      </div> -->
    </div>
    <div class="flex flex-col items-center border-t border-green-200 pt-8 pb-12 md:flex-row-reverse md:justify-between md:pt-6">
      <form class="flex w-full justify-center md:w-auto" onsubmit={handleSubmit}>
        <InputField
          type="email"
          name="email"
          aria-label={m.input_your_email()}
          placeholder={m.input_your_email()}
          autoComplete="email"
          required
          disabled={isLoading}
          class="w-60 min-w-0 shrink"
        />
        <Button type="submit" color="green" class="ml-4 flex-none" disabled={isLoading}>
          <span class="hidden lg:inline">{m.join_newsletter()}</span>
          <span class="lg:hidden">{m.join_newsletter()}</span>
        </Button>
      </form>
      <p class="mt-6 text-sm text-green-500 md:mt-0">
        {m.name()} — {m.tagline()}
      </p>
    </div>
  </Container>
</footer>
