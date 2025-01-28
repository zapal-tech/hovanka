<script lang="ts">
  import { PUBLIC_WWW_DOMAIN } from '$env/static/public'
  import CirclesBackground from '$lib/components/circles-background.svelte'
  import Logo from '$lib/components/logo.svelte'

  export let title: string
  export let subtitle: string | undefined = undefined
</script>

<main class="flex min-h-full overflow-hidden pt-16 sm:py-26">
  <div class="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
    <a href="/" aria-label={`https://${PUBLIC_WWW_DOMAIN}`} class="w-max mx-auto">
      <Logo class="mx-auto h-10 w-auto" />
    </a>

    <div class="relative mt-12 sm:mt-16">
      <CirclesBackground
        width="1090"
        height="1090"
        class="absolute -top-7 left-1/2 -z-10 h-[788px] -translate-x-1/2 stroke-green-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:-top-9 sm:h-auto"
      />
      {#if title}
        <h1 class="text-center text-2xl font-medium tracking-tight text-green-900">{title}</h1>
      {/if}
      {#if subtitle}
        <p class="mt-3 text-center text-lg text-green-800">{@html subtitle}</p>
      {/if}
    </div>

    <div
      class="-mx-4 mt-10 flex-auto bg-white px-4 py-10 shadow-2xl shadow-green-900/10 sm:mx-0 sm:flex-none sm:rounded-5xl sm:p-24"
    >
      <slot />
    </div>
  </div>
</main>
