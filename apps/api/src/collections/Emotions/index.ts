import { createParentField } from '@payloadcms/plugin-nested-docs'
import { CollectionConfig } from 'payload'

import { Collection, CollectionLabel } from '@hovanka/shared/types'

import { anyone, rootUsers } from '@api/access'

import { emotionsSelect } from './emotionsSelect'

export const Emotions: CollectionConfig = {
  slug: Collection.Emotions,
  labels: CollectionLabel.Emotions,
  timestamps: true,
  access: {
    read: anyone,
    create: anyone,
    update: rootUsers,
    delete: rootUsers,
  },
  admin: {
    useAsTitle: 'emotion',
    defaultColumns: ['emotion', 'parent'],
  },
  fields: [
    emotionsSelect(),
    createParentField(Collection.Emotions, {
      admin: {
        position: 'sidebar',
      },
    }),
  ],
}
