<script lang="ts">
  import { Locale } from '@hovanka/shared/i18n'

  import type { Journal } from '@api-types'

  import { enhance } from '$app/forms'
  import Button from '$lib/components/button.svelte'
  import Input from '$lib/components/fields/input.svelte'
  import PencilOutline from '$lib/components/icons/pencil-outline.svelte'
  import * as m from '$lib/paraglide/messages'
  import * as runtime from '$lib/paraglide/runtime'

  import type { PageProps } from './$types'

  const { data }: PageProps = $props()

  let journals = $state(data.journals)
</script>

<div
  class="flex h-[calc(100dvh-8rem)] flex-col justify-between sm:h-[calc(100dvh-10rem)] md:h-[calc(100dvh-10.4rem)] lg:h-[calc(100dvh-10.6rem)]"
>
  <div class="-mr-2 -ml-2 overflow-hidden pb-8">
    <div class="mb-8 flex flex-col gap-2 px-2">
      <h1 class="text-2xl font-bold text-green-950">{m.journal_title()}</h1>
      <p class="text-sm text-gray-500">{m.journal_subtitle()}</p>
    </div>

    <ul
      class="flex max-h-[calc(100dvh-18rem)] flex-col-reverse overflow-auto sm:max-h-[calc(100dvh-20rem)] md:max-h-[calc(100dvh-20.4rem)] lg:max-h-[calc(100dvh-20.6rem)]"
    >
      {#each journals as journal}
        <li class="group/item py-0.5">
          <a href={`/journal/${journal.id}`} class="group/link block rounded-md p-2 transition-colors hover:bg-green-300">
            <article class="flex gap-2">
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-full bg-green-300 transition-colors group-hover/link:bg-green-400"
              >
                {#if journal.type === 'journal'}
                  <PencilOutline class="size-4! text-green-800" />
                {/if}
              </div>

              <div class="flex flex-col gap-0.5">
                <time class="text-xs font-medium text-green-600 first-letter:uppercase" datetime={journal.createdAt}>
                  {new Intl.DateTimeFormat(runtime.languageTag() === Locale.Ukrainian ? 'uk-UA' : 'en-GB', {
                    timeStyle: 'short',
                    dateStyle: 'full',
                  }).format(new Date(journal.createdAt))}</time
                >

                {#if journal.title}
                  <p class="line-clamp-1 text-lg font-medium text-ellipsis text-green-950">{journal.title}</p>
                {/if}

                <p class="line-clamp-2 text-ellipsis text-green-900">{journal.content}</p>
              </div>
            </article>
          </a>
        </li>
      {/each}
    </ul>
  </div>

  <form
    method="POST"
    class="grid w-full grid-cols-12 gap-2"
    use:enhance={() =>
      ({ result, update }) => {
        if (result.type === 'success') journals = [result?.data as unknown as Journal, ...journals]

        update()
      }}
  >
    <Input
      name="content"
      placeholder={m.journal_input()}
      aria-label={m.journal_input()}
      type="textarea"
      rows="1"
      class="col-span-9 sm:col-span-10 lg:col-span-11"
      required
    />
    <Button type="submit" class="col-span-3 sm:col-span-2 lg:col-span-1">{m.save()}</Button>
  </form>
</div>
