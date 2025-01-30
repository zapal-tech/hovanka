import { CollectionConfig } from 'payload'

import { Collection, CollectionLabel } from '@hovanka/shared/types'

// import { welcomeEmail } from './hooks/welcomeEmail'

export const Journals: CollectionConfig = {
  slug: Collection.Journals,
  labels: CollectionLabel.Journals,
  timestamps: true,
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
