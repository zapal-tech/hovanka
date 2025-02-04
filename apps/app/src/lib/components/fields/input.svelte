<script lang="ts">
  import { onMount } from 'svelte'

  import { formClasses } from './classes'
  import Label from './label.svelte'

  let id: string | undefined = $state(undefined)

  onMount(() => {
    if (!id) id = `input-${Math.random().toString(36).slice(2, 10)}`
  })

  const {
    label,
    type = 'text',
    ...props
  }: {
    name: string
    label?: string
    type: 'text' | 'textarea'
    class?: string
  } & Record<string, unknown> = $props()
</script>

<div class={props.class}>
  {#if label && id}
    <Label {id} text={label} />
  {/if}

  {#if type === 'textarea'}
    <textarea {id} {...props} class={formClasses}></textarea>
  {:else}
    <input {id} {type} {...props} class={formClasses} />
  {/if}
</div>
