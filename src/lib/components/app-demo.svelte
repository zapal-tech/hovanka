<script lang="ts">
  import { AppScreen, AppScreenBody } from './app-screen'
</script>

<AppScreen>
  <AppScreenBody>
    <div class="p-4">
      <div class="flex gap-2">
        <div class="text-xs leading-6 text-green-500">Tailwind Labs, Inc.</div>
        <div class="text-sm text-green-900">$CSS</div>
        <svg viewBox="0 0 24 24" class="ml-auto h-6 w-6" fill="none">
          <path
            d="M5 12a7 7 0 1 1 14 0 7 7 0 0 1-14 0ZM12 9v6M15 12H9"
            stroke="#171717"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="mt-3 border-t border-green-200 pt-5">
        <div class="flex items-baseline gap-2">
          <div class="text-2xl tabular-nums tracking-tight text-green-900">100.00</div>
          <div class="text-sm text-green-900">USD</div>
        </div>
        <div class="mt-6 flex gap-4 text-xs text-green-500">
          <div>1D</div>
          <div>5D</div>
          <div class="font-semibold text-green-600">1M</div>
          <div>6M</div>
          <div>1Y</div>
          <div>5Y</div>
        </div>
        <div class="mt-4 rounded-lg bg-green-500 px-4 py-2 text-center text-sm font-semibold text-white">Trade</div>
        <div class="mt-3 divide-y divide-green-100 text-sm">
          <div class="flex justify-between py-1">
            <div class="text-green-500">Open</div>
            <div class="font-medium text-green-900">6,387.55</div>
          </div>
          <div class="flex justify-between py-1">
            <div class="text-green-500">Closed</div>
            <div class="font-medium text-green-900">6,487.09</div>
          </div>
          <div class="flex justify-between py-1">
            <div class="text-green-500">Low</div>
            <div class="font-medium text-green-900">6,322.01</div>
          </div>
        </div>
      </div>
    </div>
  </AppScreenBody>
</AppScreen>
