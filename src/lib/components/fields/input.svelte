<script lang="ts">
  import { onMount } from 'svelte'

  import { formClasses } from './classes'
  import Label from './label.svelte'

  export let label: string | undefined = undefined
  export let type: string = 'text'

  let id = ''

  onMount(() => {
    id = `input-${Math.random().toString(36).slice(2, 10)}`
  })
</script>

<div class={$$restProps.class}>
  {#if label}
    <Label {id} text={label} />
  {/if}

  <input {id} {type} {...$$restProps} class={formClasses} />
</div>
