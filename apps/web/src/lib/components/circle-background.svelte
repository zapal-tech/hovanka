<script lang="ts">
  import { onMount } from 'svelte'

  export let color: string
  export let width: number = 558
  export let height: number = 558
  export let viewBox: string = '0 0 558 558'
  export let ariaHidden: boolean = true
  export let fill: string = 'none'

  let id = ''

  onMount(() => {
    id = `circle-grad-${Math.random().toString(36).slice(2, 10)}`
  })
</script>

<svg {width} {height} {viewBox} {fill} aria-hidden={ariaHidden} {...$$restProps}>
  <defs>
    <linearGradient {id} x1="79" y1="16" x2="105" y2="237" gradientUnits="userSpaceOnUse">
      <stop stop-color={color} />
      <stop offset="1" stop-color={color} stop-opacity="0" />
    </linearGradient>
  </defs>
  <path
    opacity=".2"
    d="M1 279C1 125.465 125.465 1 279 1s278 124.465 278 278-124.465 278-278 278S1 432.535 1 279Z"
    stroke={color}
  />
  <path d="M1 279C1 125.465 125.465 1 279 1" stroke={`url(#${id})`} stroke-linecap="round" />
</svg>
