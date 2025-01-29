<script lang="ts">
  import { onMount } from 'svelte'

  let id: string

  onMount(() => {
    id = `gradient-${Math.random().toString(36).slice(2, 10)}`
  })
</script>

<div {...$$restProps}>
  <svg viewBox="0 0 1026 1026" fill="none" aria-hidden="true" class="animate-spin-slow absolute inset-0 h-full w-full">
    <path
      d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
      class="stroke-green-300/70"
    />
    <path d="M513 1025C230.23 1025 1 795.77 1 513" stroke={`url(#${id}-gradient-1)`} stroke-linecap="round" />
    <defs>
      <linearGradient id={`${id}-gradient-1`} x1="1" y1="513" x2="1" y2="1025" gradientUnits="userSpaceOnUse">
        <stop stop-color="oklch(0.596 0.145 163.225)" />
        <stop offset="1" stop-color="oklch(0.596 0.145 163.225)" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
  <svg viewBox="0 0 1026 1026" fill="none" aria-hidden="true" class="animate-spin-reverse-slower absolute inset-0 h-full w-full">
    <path
      d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
      class="stroke-green-300/70"
    />
    <path d="M913 513c0 220.914-179.086 400-400 400" stroke={`url(#${id}-gradient-2)`} stroke-linecap="round" />
    <defs>
      <linearGradient id={`${id}-gradient-2`} x1="913" y1="513" x2="913" y2="913" gradientUnits="userSpaceOnUse">
        <stop stop-color="oklch(0.596 0.145 163.225)" />
        <stop offset="1" stop-color="oklch(0.596 0.145 163.225)" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
</div>
