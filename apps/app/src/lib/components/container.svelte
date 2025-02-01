<script lang="ts">
  const props = $props()
</script>

<div {...props} class={['mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', props.class]}>
  {@render props.children()}
</div>
