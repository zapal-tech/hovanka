import { GroupField } from 'payload'

import { PracticeBlockTextSize, PracticeBlockType } from '@hovanka/shared/types/practiceBlocks'

export const text = (): GroupField => ({
  type: 'group',
  name: 'text',
  label: {
    en: 'Text',
    uk: 'Текст',
  },
  admin: {
    condition: (_, siblingData) => siblingData.type === PracticeBlockType.Text,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          name: 'content',
          label: {
            en: 'Content',
            uk: 'Зміст',
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
            { label: PracticeBlockTextSize.H1, value: PracticeBlockTextSize.H1 },
            { label: PracticeBlockTextSize.H2, value: PracticeBlockTextSize.H2 },
            { label: PracticeBlockTextSize.H3, value: PracticeBlockTextSize.H3 },
            { label: PracticeBlockTextSize.H4, value: PracticeBlockTextSize.H4 },
            { label: PracticeBlockTextSize.H5, value: PracticeBlockTextSize.H5 },
            { label: PracticeBlockTextSize.H6, value: PracticeBlockTextSize.H6 },
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
