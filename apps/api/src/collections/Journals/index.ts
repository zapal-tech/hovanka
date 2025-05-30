import { CollectionConfig } from 'payload'

import { Collection, CollectionLabel } from '@hovanka/shared/types'

import { createAccess, readAccess, updateAndDeleteAccess } from './access'
import { setJournalOwner } from './hooks'

export const Journals: CollectionConfig = {
  slug: Collection.Journals,
  labels: CollectionLabel.Journals,
  timestamps: true,
  access: {
    read: readAccess,
    create: createAccess,
    update: updateAndDeleteAccess,
    delete: updateAndDeleteAccess,
  },
  hooks: {
    beforeValidate: [setJournalOwner],
  },
  fields: [
    {
      type: 'text',
      name: 'title',
    },
    {
      type: 'textarea',
      name: 'content',
    },
    {
      type: 'relationship',
      name: 'user',
      relationTo: Collection.Users,
      required: true,
      index: true,
      validate: () => true as const,
    },
    {
      type: 'select',
      name: 'type',
      options: [
        { label: 'Journal', value: 'journal' },
        { label: 'Mood tracker', value: 'mood-tracker' },
      ],
    },
    {
      type: 'select',
      name: 'mood',
      options: [
        { label: 'Happy', value: 'happy' },
        { label: 'Sad', value: 'sad' },
        { label: 'Angry', value: 'angry' },
        { label: 'Anxious', value: 'anxious' },
        { label: 'Neutral', value: 'neutral' },
      ],
    },
  ],
}
