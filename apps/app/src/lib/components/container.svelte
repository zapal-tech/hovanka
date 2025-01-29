<script lang="ts">
  export let className: string = ''
</script>

<div class={['mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className]} {...$$restProps}>
  <slot />
</div>
