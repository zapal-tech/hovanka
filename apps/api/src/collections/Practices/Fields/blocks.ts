import { ArrayField } from 'payload'

import { PracticeBlockType } from '@hovanka/shared/types/practiceBlocks'

import { checkbox } from './checkbox'
import { media } from './media'
import { radioGroup } from './radioGroup'
import { text } from './text'
import { textarea } from './textarea'

export const blocks = (): ArrayField => ({
  type: 'array',
  name: 'blocks',
  label: {
    en: 'Blocks',
    uk: 'Блоки',
  },
  minRows: 1,
  fields: [
    {
      type: 'select',
      name: 'type',
      label: {
        en: 'Type',
        uk: 'Тип',
      },
      options: [
        {
          label: PracticeBlockType.Text,
          value: PracticeBlockType.Text,
        },
        {
          label: PracticeBlockType.Textarea,
          value: PracticeBlockType.Textarea,
        },
        {
          label: PracticeBlockType.Media,
          value: PracticeBlockType.Media,
        },
        {
          label: PracticeBlockType.Checkbox,
          value: PracticeBlockType.Checkbox,
        },
        {
          label: PracticeBlockType.Radio,
          value: PracticeBlockType.Radio,
        },
      ],
      defaultValue: PracticeBlockType.Text,
      required: true,
    },
    text(),
    textarea(),
    media(),
    checkbox(),
    radioGroup(),
  ],
})
