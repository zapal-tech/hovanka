<script lang="ts">
  type Variant = 'solid' | 'outline'
  type SolidColors = 'green' | 'white' | 'gray'
  type OutlineColors = 'gray'

  export let variant: Variant = 'solid'
  // Default to 'gray' for both
  export let color: SolidColors | OutlineColors = 'gray'
  export let href: string = ''
  export let type: 'button' | 'submit' | 'reset' = 'button'

  const baseStyles: Record<string, string> = {
    solid: 'inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold transition-colors',
    outline:
      'inline-flex justify-center rounded-lg border py-[calc(--spacing(2)-1px)] px-[calc(--spacing(3)-1px)] text-sm transition-colors border-green-300 text-green-700 hover:border-green-400 active:bg-green-100 active:text-green-700/80',
  }

  const variantStyles = {
    solid: {
      green:
        'relative overflow-hidden bg-green-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-green-600 active:text-white/80 before:transition-colors',
      white: 'bg-white text-green-900 hover:bg-white/90 active:bg-white/90 active:text-green-900/70',
      gray: 'bg-green-800 text-white hover:bg-green-900 active:bg-green-800 active:text-white/80',
    },
    outline: {
      gray: 'border-green-300 text-green-700 hover:border-green-400 active:bg-green-100 active:text-green-700/80',
    },
  }

  const classes = [
    baseStyles[variant],
    variant === 'outline' ? variantStyles.outline[color as OutlineColors] : variantStyles.solid[color as SolidColors],
    $$restProps.class,
  ]
</script>

{#if href}
  <a {...$$restProps} class={classes} {href}>
    <slot />
  </a>
{:else}
  <button {...$$restProps} class={classes} {type}>
    <slot />
  </button>
{/if}
