import { GroupField } from 'payload'

import { PracticeBlockTextSize, PracticeBlockType } from '@hovanka/shared/types/practiceBlocks'

export const radioGroup = (): GroupField => ({
  type: 'group',
  name: 'radio',
  label: {
    en: 'Radio Group',
    uk: 'Група перемикачів',
  },
  admin: {
    condition: (_, siblingData) => siblingData.type === PracticeBlockType.Radio,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          name: 'title',
          label: {
            en: 'Title',
            uk: 'Заголовок',
          },
          localized: true,
        },
        {
          type: 'select',
          name: 'sizeText',
          label: {
            en: 'Size text',
            uk: 'Розмір тексту',
          },
          options: [
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
    {
      type: 'array',
      name: 'options',
      label: {
        en: 'Radio Options',
        uk: 'Опції перемикачів',
      },
      minRows: 2,
      fields: [
        {
          type: 'text',
          name: 'label',
          label: {
            en: 'Label',
            uk: 'Етикетка',
          },
          localized: true,
          required: true,
        },
      ],
    },
  ],
})
