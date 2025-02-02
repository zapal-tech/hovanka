import * as migration_20250131_073542_initial from './20250131_073542_initial'
import * as migration_20250202_160354_update_user from './20250202_160354_update_user'

export const migrations = [
  {
    up: migration_20250131_073542_initial.up,
    down: migration_20250131_073542_initial.down,
    name: '20250131_073542_initial',
  },
  {
    up: migration_20250202_160354_update_user.up,
    down: migration_20250202_160354_update_user.down,
    name: '20250202_160354_update_user',
  },
]
