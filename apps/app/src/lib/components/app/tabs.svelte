<script lang="ts">
  import { page } from '$app/state'
  import * as m from '$lib/paraglide/messages'

  import Cog_6ToothOutline from '../icons/cog-6-tooth-outline.svelte'
  import Cog_6ToothSolid from '../icons/cog-6-tooth-solid.svelte'
  import FaceSmileOutline from '../icons/face-smile-outline.svelte'
  import FaceSmileSolid from '../icons/face-smile-solid.svelte'
  import HomeOutline from '../icons/home-outline.svelte'
  import HomeSolid from '../icons/home-solid.svelte'
  import PencilOutline from '../icons/pencil-outline.svelte'
  import PencilSolid from '../icons/pencil-solid.svelte'

  const isHome = () => ['/', '/uk', '/en'].includes(page.url.pathname)
  const isMood = () => page.url.pathname.endsWith('/mood')
  const isJournal = () => page.url.pathname.endsWith('/journal')
  const isSettings = () => page.url.pathname.endsWith('/settings')

  const tabs = [
    {
      name: m.menu_home(),
      href: '/',
      icon: HomeOutline,
      activeIcon: HomeSolid,
      isActiveFunction: isHome,
    },
    {
      name: m.menu_mood(),
      href: '/mood',
      icon: FaceSmileOutline,
      activeIcon: FaceSmileSolid,
      isActiveFunction: isMood,
    },
    {
      name: m.menu_journal(),
      href: '/journal',
      icon: PencilOutline,
      activeIcon: PencilSolid,
      isActiveFunction: isJournal,
    },
    {
      name: m.menu_settings(),
      href: '/settings',
      icon: Cog_6ToothOutline,
      activeIcon: Cog_6ToothSolid,
      isActiveFunction: isSettings,
    },
  ]
</script>

<div class="p2-4 fixed bottom-0 w-full rounded-tl-3xl rounded-tr-3xl bg-green-300 py-4 sm:px-6">
  <ul class="grid grid-cols-4 gap-2">
    {#each tabs as { name, href, icon: Icon, activeIcon: ActiveIcon, isActiveFunction }}
      <li class="relative">
        <a {href} class={['flex flex-col items-center justify-center gap-1']}>
          {#if isActiveFunction()}
            <ActiveIcon />
          {:else}
            <Icon />
          {/if}

          <span class="text-center text-xs font-light text-green-900 sm:text-sm">{name}</span>
        </a>
      </li>
    {/each}
  </ul>
</div>
