import { GroupField } from 'payload'

import { PracticeBlockTextSize, PracticeBlockType } from '@hovanka/shared/types/practiceBlocks'

export const checkbox = (): GroupField => ({
  type: 'group',
  name: 'checkbox',
  label: {
    en: 'Checkbox',
    uk: 'Прапорець',
  },
  admin: {
    condition: (_, siblingData) => siblingData.type === PracticeBlockType.Checkbox,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          name: 'text',
          label: {
            en: 'Text',
            uk: 'Текст',
          },
          localized: true,
          required: true,
        },
        {
          type: 'select',
          name: 'size',
          label: {
            en: 'Size',
            uk: 'Розмір',
          },
          options: [
            { label: PracticeBlockTextSize.Base, value: PracticeBlockTextSize.Base },
            { label: PracticeBlockTextSize.Small, value: PracticeBlockTextSize.Small },
          ],
          required: true,
          defaultValue: PracticeBlockTextSize.Base,
        },
      ],
    },
  ],
})
