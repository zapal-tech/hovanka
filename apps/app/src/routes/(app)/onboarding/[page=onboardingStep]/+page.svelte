<script lang="ts">
  import { OnboardingStepType } from '@hovanka/shared/types/onboarding'

  import { enhance } from '$app/forms'
  import Button from '$lib/components/button.svelte'
  import * as m from '$lib/paraglide/messages'

  const { data } = $props()

  // @ts-ignore
  const stepTitle = m[`onboarding_step_${data.onboardingStep}_title`]?.()
  // @ts-ignore
  const stepSubtitle = m[`onboarding_step_${data.onboardingStep}_subtitle`]?.()
  // @ts-ignore
  const stepSubmit = m[`onboarding_step_${data.onboardingStep}_submit`]?.()
  // @ts-ignore
  const stepDecline = m[`onboarding_step_${data.onboardingStep}_decline`]?.() || ''

  let values = $state<number[]>([])
  let value = $state(true)

  let form: HTMLFormElement

  const declineAndSubmit = () => {
    value = false

    setTimeout(() => {
      form.requestSubmit()
    }, 100)
  }
</script>

{#snippet multipleChoiceList(options: { id: number; value: string }[])}
  <ul class="col-span-full mb-8 flex flex-col gap-2">
    {#each options as option, index}
      <li id={`${data.onboardingStep}-option-${index}`}>
        <label
          class={[
            'flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
            values.includes(option.id) ? 'bg-green-400 text-white' : 'bg-green-200',
          ]}
          for={`${data.onboardingStep}-${option.id}`}
        >
          <input
            type="checkbox"
            name="values"
            value={option.id}
            id={`${data.onboardingStep}-${option.id}`}
            bind:group={values}
            class="hidden"
          />
          {option.value}
        </label>
      </li>
    {/each}
  </ul>
{/snippet}

{#snippet multipleChoiceChips(options: { id: number; value: string }[])}
  <ul class="col-span-full mb-8 flex h-fit flex-wrap justify-center gap-2">
    {#each options as option, index}
      <li id={`${data.onboardingStep}-option-${index}`}>
        <label
          class={[
            'cursor-pointer rounded-full border px-3 py-1 text-sm font-medium transition-colors',
            values.includes(option.id)
              ? 'border-green-400 bg-green-300 text-green-900'
              : 'border-green-100 bg-green-100 text-green-900 hover:bg-green-200',
          ]}
          for={`${data.onboardingStep}-${option.id}`}
        >
          <input
            type="checkbox"
            name="values"
            value={option.id}
            id={`${data.onboardingStep}-${option.id}`}
            bind:group={values}
            class="hidden"
          />
          {option.value}
        </label>
      </li>
    {/each}
  </ul>
{/snippet}

<div class="flex h-full flex-col">
  <div>
    <h1 class="mb-2 text-center font-serif text-3xl font-semibold text-green-950">
      {stepTitle}
    </h1>
    <p class="mb-12 text-center text-lg text-green-800">
      {stepSubtitle}
    </p>
  </div>

  <form
    bind:this={form}
    method="POST"
    class="grid h-full w-full grid-cols-2 gap-2"
    use:enhance={() =>
      ({ result, update }) => {
        // if (result.type === 'success') journals = [result?.data as unknown as Journal, ...journals]

        update()
      }}
  >
    {#if data.onboardingData?.steps?.[data.onboardingStep as unknown as 'userGoals']?.type === OnboardingStepType.MultipleChoiceList}
      {@render multipleChoiceList(
        data.onboardingData?.steps[data.onboardingStep as unknown as 'userGoals'].data as { id: number; value: string }[],
      )}
    {:else if data.onboardingData?.steps?.[data.onboardingStep as unknown as 'userGoals']?.type === OnboardingStepType.MultipleChoiceChips}
      {@render multipleChoiceChips(
        data.onboardingData?.steps[data.onboardingStep as unknown as 'userGoals'].data as { id: number; value: string }[],
      )}
    {/if}

    {#if stepDecline}
      <input class="hidden" type="checkbox" name="value" bind:checked={value} />
    {/if}

    <div class="col-span-full mt-auto grid grid-cols-2 gap-2">
      <Button type="submit" color="green" class={stepDecline ? 'col-span-1' : 'col-span-full'}>
        {stepSubmit}</Button
      >

      {#if stepDecline}
        <Button type="button" color="gray" variant="outline" onclick={declineAndSubmit}>
          {stepDecline}</Button
        >
      {/if}
    </div>
  </form>
</div>
