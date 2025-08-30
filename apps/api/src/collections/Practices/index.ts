import { CollectionConfig } from 'payload'

import { Collection, CollectionLabel } from '@hovanka/shared/types'
import { PracticeBlockType } from '@hovanka/shared/types/practiceBlocks'

import { anyone, rootUsers } from '@api/access'

import { blocks } from './Fields/blocks'

export const Practices: CollectionConfig = {
  slug: Collection.Practices,
  labels: CollectionLabel.Practices,
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
      localized: true,
      required: true,
    },
    {
      type: 'text',
      name: 'description',
      label: {
        en: 'Description',
        uk: 'Опис',
      },
      localized: true,
    },
    {
      type: 'array',
      name: 'steps',
      label: {
        en: 'Steps',
        uk: 'Кроки',
      },
      minRows: 1,
      fields: [blocks()],
    },
  ],
}
