<script lang="ts">
  import { createI18n } from '@inlang/paraglide-sveltekit'

  import { page } from '$app/stores'
  // import { i18n } from '$lib/i18n'
  import * as runtime from '$lib/paraglide/runtime'

  const languages = runtime.availableLanguageTags
</script>

<ul class={['flex gap-5 lg:gap-3', $$restProps.class]}>
  {#each languages as lang}
    <li>
      <a
        class={[
          'uppercase transition-colors lg:rounded-lg lg:px-[calc(--spacing(3)-1px)] lg:py-[calc(--spacing(2)-1px)] lg:hover:bg-green-100',
          lang === runtime.languageTag() ? 'text-green-900 hover:text-green-700' : 'text-green-400 hover:text-green-700',
        ]}
        href={createI18n(runtime, { prefixDefaultLanguage: 'always', exclude: [/^\/api\/.*/, /\.pdf$/, '/sw.js'] }).route(
          $page.url.pathname,
        )}
        hreflang={lang}
        aria-current={lang === runtime.languageTag() ? 'page' : undefined}
        aria-label={`Change language to "${lang}" button`}
      >
        {lang}
      </a>
    </li>
  {/each}
</ul>
