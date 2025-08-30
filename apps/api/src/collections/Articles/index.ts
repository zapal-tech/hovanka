import { CollectionConfig } from 'payload'

import { Collection, CollectionLabel } from '@hovanka/shared/types'

import { anyone, rootUsers } from '@api/access'

export const Articles: CollectionConfig = {
  slug: Collection.Articles,
  labels: CollectionLabel.Articles,
  timestamps: true,
  access: {
    read: anyone,
    create: rootUsers,
    update: rootUsers,
    delete: rootUsers,
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: {
        en: 'Title',
        uk: 'Заголовок',
      },
      required: true,
    },
    {
      type: 'richText',
      name: 'content',
      label: {
        en: 'Content',
        uk: 'Контент',
      },
      required: true,
    },
    {
      type: 'relationship',
      name: 'tags',
      label: {
        en: 'Tags',
        uk: 'Теги',
      },
      relationTo: Collection.Tags,
      hasMany: true,
    },
  ],
}
