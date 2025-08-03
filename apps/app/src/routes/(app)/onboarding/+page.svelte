<script lang="ts">
  import { enhance } from '$app/forms'
  import Button from '$lib/components/button.svelte'
  import * as m from '$lib/paraglide/messages'
</script>

<div class="flex h-full">
  <div class="absolute top-1/2 -translate-y-1/2">
    <h1 class="text-center font-serif text-3xl font-semibold text-green-950">{m.onboarding_welcome_title()}</h1>
    <p class="text-center text-lg text-green-800">{m.onboarding_welcome_subtitle()}</p>

    <img src="/hovanka-illustration.svg" alt="Hovanka illustration" class="mx-auto mt-8 mb-12 h-24 w-auto max-w-full" />
  </div>

  <form
    method="POST"
    class="mt-auto grid w-full gap-2"
    use:enhance={() =>
      ({ result, update }) => {
        // if (result.type === 'success') journals = [result?.data as unknown as Journal, ...journals]

        update()
      }}
  >
    <Button type="submit" color="green">{m.onboarding_welcome_submit()}</Button>
  </form>
</div>
