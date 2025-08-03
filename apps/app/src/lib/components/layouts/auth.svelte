<script lang="ts">
  import type { Snippet } from 'svelte'

  import { PUBLIC_WWW_DOMAIN } from '$env/static/public'
  import CirclesBackground from '$lib/components/circles-background.svelte'
  import Logo from '$lib/components/logo.svelte'

  const {
    children,
    title,
    subtitle,
    subtitlePosition = 'top',
  }: { title?: string; subtitle?: string; subtitlePosition?: 'top' | 'bottom'; children: Snippet } = $props()
</script>

{#snippet subtitleSnippet(content: string)}
  <p class={['text-center text-lg text-green-900', subtitlePosition === 'top' ? 'mt-3' : 'my-8']}>{@html content}</p>
{/snippet}

<main class="flex min-h-full overflow-hidden pt-16 sm:py-26">
  <div class="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
    <a href="/" aria-label={`https://${PUBLIC_WWW_DOMAIN}`} class="mx-auto w-max">
      <Logo class="mx-auto h-10 w-auto" />
    </a>

    <div class="relative mt-12 sm:mt-16">
      <CirclesBackground
        width="1090"
        height="1090"
        class="absolute -top-7 left-1/2 -z-10 h-[788px] -translate-x-1/2 stroke-green-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:-top-9 sm:h-auto"
      />
      {#if title}
        <h1 class="text-center text-2xl font-medium tracking-tight whitespace-pre-line text-green-950">{title}</h1>
      {/if}
      {#if subtitle && subtitlePosition === 'top'}
        {@render subtitleSnippet(subtitle)}
      {/if}
    </div>

    <div
      class="-mx-4 flex-auto bg-transparent px-4 py-10 sm:mx-0 sm:mt-10 sm:flex-none sm:rounded-3xl sm:bg-white sm:pt-20 sm:pb-12 sm:shadow-2xl sm:shadow-green-900/10"
    >
      {@render children()}
    </div>

    {#if subtitle && subtitlePosition === 'bottom'}
      {@render subtitleSnippet(subtitle)}
    {/if}
  </div>
</main>
