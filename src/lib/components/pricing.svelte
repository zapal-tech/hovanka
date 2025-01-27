<script lang="ts">
  import * as m from '$lib/paraglide/messages'

  import Container from './container.svelte'
  import Plan from './pricing-plan.svelte'

  type Period = 'monthly' | 'annually'

  let activePeriod = $state<Period>('monthly')

  let plans: {
    name: string
    price: Record<Period, string>
    description: string
    features: string[]
    button: { label: string; href: string }
  }[] = Array(3)
    .fill(null)
    .map((_, index) => ({
      name: (m as any)[`pricing_plan_${index}_name`](),
      featured: (m as any)[`pricing_plan_${index}_featured`]() === 'true',
      price: {
        monthly: (m as any)[`pricing_plan_${index}_price_monthly`](),
        annually: (m as any)[`pricing_plan_${index}_price_annually`](),
      },
      description: (m as any)[`pricing_plan_${index}_description`](),
      button: {
        label: (m as any)[`pricing_plan_${index}_button_label`](),
        href: (m as any)[`pricing_plan_${index}_button_href`](),
      },
      features: ((m as any)[`pricing_plan_${index}_features`]() as string)
        .split(',')
        .map((feature: string) => feature.trim())
        .filter(Boolean),
      logoMarkClass: 'fill-green-500',
    }))
</script>

<section id="pricing" aria-labelledby="pricing-title" class="border-t border-green-200 bg-green-100 py-20 sm:py-32">
  <Container>
    <div class="mx-auto max-w-2xl text-center">
      <h2 id="pricing-title" class="text-3xl font-medium tracking-tight text-green-900">{m.pricing_title()}</h2>
      <p class="mt-2 text-lg text-green-600">
        {m.pricing_subtitle()}
      </p>
    </div>

    <div class="mt-8 flex justify-center">
      <div class="relative">
        <div id="pricing-perion" role="radiogroup" class="grid grid-cols-2">
          {#each ['monthly', 'annually'] as period}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div
              role="radio"
              id={`radio-${period}`}
              aria-checked={period === activePeriod}
              data-headlessui-checked={period === activePeriod}
              data-checked={period === activePeriod}
              tabindex={period === activePeriod ? 0 : -1}
              class={[
                'cursor-pointer capitalize border border-green-300 px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing.2)-1px)] text-center text-sm text-green-700 focus:outline-2 focus:outline-offset-2 transition-colors hover:border-green-400',
                period === 'monthly' ? 'rounded-l-lg' : '-ml-px rounded-r-lg',
              ]}
              onclick={() => (activePeriod = period as Period)}
              onkeydown={(e) => {
                if (period === activePeriod && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                  document.getElementById(`radio-${activePeriod === 'annually' ? 'monthly' : 'annually'}`)?.focus?.()
                  activePeriod = (activePeriod === 'annually' ? 'monthly' : 'annually') as Period
                }
              }}
            >
              {(m as any)[period]()}
            </div>
          {/each}
        </div>

        <div
          aria-hidden="true"
          class={[
            'pointer-events-none absolute inset-0 z-10 grid grid-cols-2 overflow-hidden rounded-lg bg-green-500 transition-all duration-300',
            activePeriod === 'monthly' ? '[clip-path:inset(0_50%_0_0)]' : '[clip-path:inset(0_0_0_calc(50%-1px))]',
          ]}
        >
          {#each ['monthly', 'annually'] as period}
            <div class="py-2 capitalize text-center text-sm font-semibold text-white {period === 'annually' ? '-ml-px' : ''}">
              {(m as any)[period]()}
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-10 sm:mt-20 lg:max-w-none lg:grid-cols-3">
      {#each plans as plan}
        <Plan {...plan} {activePeriod} />
      {/each}
    </div>
  </Container>
</section>
