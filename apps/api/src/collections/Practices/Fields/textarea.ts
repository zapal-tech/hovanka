import { GroupField } from 'payload'

import { PracticeBlockType } from '@hovanka/shared/types/practiceBlocks'

export const textarea = (): GroupField => ({
  type: 'group',
  name: 'textarea',
  label: {
    en: 'Text',
    uk: 'Текст',
  },
  admin: {
    condition: (_, siblingData) => siblingData.type === PracticeBlockType.Textarea,
  },
  fields: [
    {
      type: 'textarea',
      name: 'content',
      label: {
        en: 'Content',
        uk: 'Зміст',
      },
      localized: true,
      required: true,
    },
  ],
})
