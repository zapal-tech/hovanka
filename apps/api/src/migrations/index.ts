import * as migration_20250131_071945 from './20250131_071945'

export const migrations = [
  {
    up: migration_20250131_071945.up,
    down: migration_20250131_071945.down,
    name: '20250131_071945',
  },
]
