<script lang="ts">
  import * as m from '$lib/paraglide/messages'

  import type { PageProps } from './$types'

  let { data }: PageProps = $props()
</script>

<div class="grid gap-4 sm:grid-cols-2">
  <!-- <div class="rounded-3xl bg-gradient-to-br from-green-400 via-emerald-200 to-green-100 p-8 shadow-xl">
    <h1 class="text-3xl font-bold text-green-900 sm:text-4xl">
      {m.hi()}{data.user.firstName ? ', ' : ''}{data.user.firstName}!
    </h1>
  </div>

  <div class="flex flex-col rounded-3xl bg-gradient-to-br from-green-300 via-emerald-200 to-green-100 p-8 shadow-xl">
    <p class="text-middle text-xl text-green-800 sm:text-2xl">{m.how_are_you_feeling_today()}</p>
    <p class="text-md text-green-800 sm:text-lg">{m.hope_you_are_doing_great()}</p>
  </div>

  <div class="col-span-full h-56 rounded-3xl bg-gradient-to-br from-green-300 via-emerald-200 to-green-100 p-8 shadow-xl"></div> -->
</div>
