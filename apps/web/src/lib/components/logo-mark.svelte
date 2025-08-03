<script lang="ts">
  import type { ClassValue } from 'svelte/elements'

  const { width = 40, height = 40, ...props }: { width?: number; height?: number; class?: ClassValue } = $props()
</script>

<svg {...props} {width} {height} viewBox="0 0 28.575 28.575" aria-hidden={true}>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M14.287 1.777c-.37 0-.71.197-.896.517L.141 25.246c-.4.69.099 1.552.895 1.552H6.75a1.477 1.477 0 0 0 1.28-.739l5.363-9.29a1.034 1.034 0 0 1 1.791 0l5.364 9.29a1.477 1.477 0 0 0 1.279.739h5.713c.796 0 1.294-.862.896-1.552L15.184 2.294a1.035 1.035 0 0 0-.897-.517z"
  />
</svg>
