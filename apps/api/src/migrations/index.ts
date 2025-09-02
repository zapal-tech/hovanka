import * as migration_20250131_073542_initial from './20250131_073542_initial'
import * as migration_20250202_160354_update_user from './20250202_160354_update_user'
import * as migration_20250803_224044_onboarding_flow from './20250803_224044_onboarding_flow'
import * as migration_20250819_172624_marketing_sign_up_flow from './20250819_172624_marketing_sign_up_flow'
import * as migration_20250902_124001_collection_emotions__emotions_statistics__practices__tags__articles__job_emotions_statistics from './20250902_124001_collection_emotions__emotions_statistics__practices__tags__articles__job_emotions_statistics'

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
  {
    up: migration_20250803_224044_onboarding_flow.up,
    down: migration_20250803_224044_onboarding_flow.down,
    name: '20250803_224044_onboarding_flow',
  },
  {
    up: migration_20250819_172624_marketing_sign_up_flow.up,
    down: migration_20250819_172624_marketing_sign_up_flow.down,
    name: '20250819_172624_marketing_sign_up_flow',
  },
  {
    up: migration_20250902_124001_collection_emotions__emotions_statistics__practices__tags__articles__job_emotions_statistics.up,
    down: migration_20250902_124001_collection_emotions__emotions_statistics__practices__tags__articles__job_emotions_statistics.down,
    name: '20250902_124001_collection_emotions__emotions_statistics__practices__tags__articles__job_emotions_statistics',
  },
]
