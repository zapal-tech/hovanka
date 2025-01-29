<script lang="ts">
  import { onMount } from 'svelte'

  import { formClasses } from './classes'
  import Label from './label.svelte'

  export let label: string | undefined

  // We'll store a unique ID for the select element.
  let id = ''

  onMount(() => {
    id = `select-${Math.random().toString(36).slice(2, 10)}`
  })
</script>

<div {...$$restProps}>
  {#if label}
    <Label {id} text={label} />
  {/if}

  <select {id} class={[formClasses, 'pr-8']}>
    <slot />
  </select>
</div>
