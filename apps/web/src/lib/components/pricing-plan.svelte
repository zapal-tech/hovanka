<script lang="ts">
  import * as m from '$lib/paraglide/messages'

  import Button from './button.svelte'
  import CheckIcon from './icons/check.svelte'
  import LogoMark from './logo-mark.svelte'

  interface PlanProps {
    name: string
    price: {
      monthly: string
      annually: string
    }
    description: string
    button: {
      label: string
      href: string
    }
    features: Array<string>
    activePeriod: 'monthly' | 'annually'
    logoMarkClass?: string
    featured?: boolean
  }

  export let name!: PlanProps['name']
  export let price!: PlanProps['price']
  export let description!: PlanProps['description']
  export let button!: PlanProps['button']
  export let features!: PlanProps['features']
  export let activePeriod!: PlanProps['activePeriod']
  export let logoMarkClass: string | undefined = undefined
  export let featured: boolean = false
</script>

<section
  class={[
    'flex flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-green-900/5',
    featured ? 'order-first bg-green-900 lg:order-none' : 'bg-white',
  ]}
>
  <h3 class={['flex items-center text-sm', featured ? 'text-white' : 'text-green-950']}>
    <LogoMark class={['h-6 w-6 flex-none', logoMarkClass]} />
    <span class="ml-4">{name}</span>
  </h3>
  <p class={['relative mt-5 flex gap-2 text-3xl tracking-tight', featured ? 'text-white' : 'text-green-950']}>
    {#if price.monthly === price.annually}
      {price.monthly}
    {:else}
      <span
        aria-hidden={activePeriod === 'annually'}
        class={[
          'transition duration-300',
          activePeriod !== 'monthly' && 'pointer-events-none absolute top-0 left-0 -translate-x-6 opacity-0 select-none',
        ]}
      >
        {price.monthly} <span class="text-lg"> {m.per_month()}</span>
      </span>
      <span
        aria-hidden={activePeriod === 'monthly'}
        class={[
          'transition duration-300',
          activePeriod !== 'annually' && 'pointer-events-none absolute top-0 left-0 translate-x-6 opacity-0 select-none',
        ]}
      >
        {price.annually} <span class="text-lg"> {m.per_month()}</span>
      </span>
    {/if}
  </p>
  <p class={['mt-3 text-sm', featured ? 'text-green-200' : 'text-green-700']}>
    {description}
  </p>
  <div class="order-last mt-6">
    <ul
      role="list"
      class={['-my-2 divide-y text-sm', featured ? 'divide-green-700 text-green-200' : 'divide-green-200 text-green-700']}
    >
      {#each features as feature}
        <li class="flex py-2">
          <CheckIcon class={['h-6 w-6 flex-none', featured ? 'text-white' : 'text-green-800']} />
          <span class="ml-4">{feature}</span>
        </li>
      {/each}
    </ul>
  </div>
  <Button
    href={button.href}
    color={featured ? 'green' : 'gray'}
    class="mt-6"
    aria-label={`Get started with the ${name} plan for ${activePeriod === 'monthly' ? price.monthly : price.annually}`}
  >
    {button.label}
  </Button>
</section>
