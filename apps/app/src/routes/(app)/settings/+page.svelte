<script lang="ts">
  import { goto } from '$app/navigation'
  import Button from '$lib/components/button.svelte'
  import LanguageSwitcher from '$lib/components/language-switcher.svelte'
  import * as m from '$lib/paraglide/messages'
</script>

<LanguageSwitcher />

<Button class="mt-8" onclick={() => goto('/sign-out')}>
  {m.sign_out()}
</Button>
