<script lang="ts">
  import { Locale } from '@hovanka/shared/i18n'

  import * as runtime from '$lib/paraglide/runtime'

  import type { PageProps } from './$types'

  const { data }: PageProps = $props()
</script>

<time class="text-xs font-medium text-green-600 first-letter:uppercase" datetime={data.journal.createdAt}>
  {new Intl.DateTimeFormat(runtime.languageTag() === Locale.Ukrainian ? 'uk-UA' : 'en-GB', {
    timeStyle: 'short',
    dateStyle: 'full',
  }).format(new Date(data.journal.createdAt))}</time
>

<p>
  {data.journal.title}
</p>

<p>
  {data.journal.content}
</p>
