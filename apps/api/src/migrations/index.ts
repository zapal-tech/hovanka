import * as migration_20250131_073542_initial from './20250131_073542_initial'

export const migrations = [
  {
    up: migration_20250131_073542_initial.up,
    down: migration_20250131_073542_initial.down,
    name: '20250131_073542_initial',
  },
]
