<script lang="ts">
  import * as m from '$lib/paraglide/messages'

  const links = [
    { label: m.nav_features(), href: '/#features' },
    { label: m.nav_pricing(), href: '/#pricing' },
    { label: m.nav_faqs(), href: '/#faqs' },
  ]
</script>

{#each links as { label, href }, index}
  <a
    {href}
    class="relative -mx-3 -my-2 rounded-lg bg-transparent px-3 py-2 text-sm text-green-700 transition-colors delay-150 hover:bg-green-100 hover:text-green-900 hover:delay-0"
  >
    <span class="relative z-10">{label}</span>
  </a>
{/each}
