<script lang="ts">
  export let id: string
  export let text: string
</script>

<label for={id} class="mb-2 block text-sm font-semibold text-green-900" {...$$restProps}>
  {text}
  <slot />
</label>
