import { GroupField } from 'payload'

import { PracticeBlockMediaAspectRatio, PracticeBlockType } from '@hovanka/shared/types/practiceBlocks'

export const media = (): GroupField => ({
  type: 'group',
  name: 'media',
  label: {
    en: 'Media Block',
    uk: 'Медіа блок',
  },
  admin: {
    condition: (_, siblingData) => siblingData.type === PracticeBlockType.Media,
  },
  fields: [
    {
      type: 'row',
      fields: [
        // {
        //   type: 'upload',
        //   name: 'media',
        //   label: {
        //     en: 'Media',
        //     uk: 'Медіа',
        //   },
        //   relationTo: 'media',
        //   localized: true,
        //   required: true,
        // },
        // {
        //   type: 'select',
        //   name: 'aspectRatio',
        //   options: [
        //     { label: PracticeBlockMediaAspectRatio['16:9'], value: PracticeBlockMediaAspectRatio['16:9'] },
        //     { label: PracticeBlockMediaAspectRatio['4:3'], value: PracticeBlockMediaAspectRatio['4:3'] },
        //     { label: PracticeBlockMediaAspectRatio['1:1'], value: PracticeBlockMediaAspectRatio['1:1'] },
        //     { label: PracticeBlockMediaAspectRatio['3:4'], value: PracticeBlockMediaAspectRatio['3:4'] },
        //     { label: PracticeBlockMediaAspectRatio['9:16'], value: PracticeBlockMediaAspectRatio['9:16'] },
        //     { label: PracticeBlockMediaAspectRatio.FullWidth, value: PracticeBlockMediaAspectRatio.FullWidth },
        //   ],
        // },
      ],
    },
  ],
})
