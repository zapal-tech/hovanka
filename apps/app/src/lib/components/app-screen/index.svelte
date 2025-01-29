<script lang="ts">
  import Logo from './icons/logo.svelte'
  import MenuIcon from './icons/menu.svelte'
  import UserIcon from './icons/user.svelte'
</script>

<div class={['flex flex-col', $$restProps.class]} {...$$restProps}>
  <div class="flex justify-between px-4 pt-4">
    <MenuIcon class="h-6 w-6 flex-none" />
    <Logo class="h-6 flex-none" />
    <UserIcon class="h-6 w-6 flex-none" />
  </div>

  <slot />
</div>
