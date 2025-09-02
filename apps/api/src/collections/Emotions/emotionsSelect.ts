import { SelectField } from 'payload'

import { EmotionsValues } from '@hovanka/shared/types/emotions'

export const emotionsSelect = (): SelectField => ({
  type: 'select',
  name: 'emotion',
  label: {
    en: 'Emotion',
    uk: 'Емоція',
  },
  options: [
    { label: EmotionsValues.Happy, value: EmotionsValues.Happy },
    { label: EmotionsValues.Sad, value: EmotionsValues.Sad },
    { label: EmotionsValues.Angry, value: EmotionsValues.Angry },
    { label: EmotionsValues.Mad, value: EmotionsValues.Mad },
    { label: EmotionsValues.Scared, value: EmotionsValues.Scared },
    { label: EmotionsValues.Peaceful, value: EmotionsValues.Peaceful },
    { label: EmotionsValues.Hateful, value: EmotionsValues.Hateful },
    { label: EmotionsValues.Hopeful, value: EmotionsValues.Hopeful },
    { label: EmotionsValues.Sleepy, value: EmotionsValues.Sleepy },
    { label: EmotionsValues.Excited, value: EmotionsValues.Excited },
    { label: EmotionsValues.Calm, value: EmotionsValues.Calm },
    { label: EmotionsValues.Frustrated, value: EmotionsValues.Frustrated },
    { label: EmotionsValues.Lonely, value: EmotionsValues.Lonely },
    { label: EmotionsValues.Grateful, value: EmotionsValues.Grateful },
    { label: EmotionsValues.Confused, value: EmotionsValues.Confused },
  ],
  required: true,
})
