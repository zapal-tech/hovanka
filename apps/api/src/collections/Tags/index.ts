import { CollectionConfig } from 'payload'

import { Collection, CollectionLabel } from '@hovanka/shared/types'

import { anyone, rootUsers } from '@api/access'

export const Tags: CollectionConfig = {
  slug: Collection.Tags,
  labels: CollectionLabel.Tags,
  access: {
    read: anyone,
    create: rootUsers,
    update: rootUsers,
    delete: rootUsers,
  },
  fields: [
    {
      type: 'text',
      name: 'tag',
      label: {
        en: 'Tag',
        uk: 'Тег',
      },
      localized: true,
      required: true,
    },
  ],
}
