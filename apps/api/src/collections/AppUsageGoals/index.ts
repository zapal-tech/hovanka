// Anxiety management, stress management, sleep improvement, productivity improvement, self-discovery, self-awareness

import { CollectionConfig } from 'payload'

import { Collection, CollectionLabel } from '@hovanka/shared/types'

export const AppUsageGoals: CollectionConfig = {
  slug: Collection.AppUsageGoals,
  labels: CollectionLabel.AppUsageGoals,
  fields: [
    {
      type: 'text',
      name: 'title',
      localized: true,
    },
  ],
}
