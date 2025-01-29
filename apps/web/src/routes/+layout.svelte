<script>
  // import { i18n } from '$lib/i18n'
  import { createI18n, ParaglideJS } from '@inlang/paraglide-sveltekit'

  import * as runtime from '$lib/paraglide/runtime'

  import '../app.css'

  const { children } = $props()
</script>

<ParaglideJS i18n={createI18n(runtime, { prefixDefaultLanguage: 'always' })}>
  {@render children()}
</ParaglideJS>
