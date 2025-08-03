<script lang="ts">
  import Button from '$lib/components/button.svelte'
  import LanguageSwitcher from '$lib/components/language-switcher.svelte'
  import * as m from '$lib/paraglide/messages'
</script>

<LanguageSwitcher />

<Button class="mt-8" href="/sign-out">
  {m.sign_out()}
</Button>
