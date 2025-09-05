<script lang="ts">
  import Button from '$lib/components/button.svelte'
  import * as m from '$lib/paraglide/messages'

  const title = m.onboarding_completed_title()
  const subtitle = m.onboarding_completed_subtitle()
  const button = m.onboarding_completed_button()
</script>

<div class="flex flex-col self-center">
  <div>
    <h1 class="mb-2 text-center font-serif text-3xl font-semibold text-green-950">
      {title}
    </h1>
    <p class="mb-12 text-center text-lg text-green-800">
      {subtitle}
    </p>
  </div>

  <div class="grid w-full grid-cols-2 gap-2">
    <div class="col-span-full grid grid-cols-2 gap-2">
      <Button href="/" color="green" class="col-span-full">
        {button}</Button
      >
    </div>
  </div>
</div>
