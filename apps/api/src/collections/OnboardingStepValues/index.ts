import { CollectionConfig } from 'payload'

import { Collection, CollectionLabel } from '@hovanka/shared/types/index'
import { OnboardingStep } from '@hovanka/shared/types/onboarding'

import { allUsers, rootUsers } from '@api/access'

export const OnboardingStepValues: CollectionConfig = {
  slug: Collection.OnboardingStepValues,
  labels: CollectionLabel.OnboardingStepValues,
  access: {
    read: allUsers,
    create: rootUsers,
    update: rootUsers,
    delete: rootUsers,
  },
  admin: {
    useAsTitle: 'value',
    defaultColumns: ['value', 'step'],
  },
  fields: [
    {
      name: 'step',
      type: 'select',
      label: {
        en: 'Onboarding Step',
        uk: 'Крок онбордингу',
      },
      options: [
        {
          label: {
            en: 'User Goals',
            uk: 'Цілі користувача',
          },
          value: OnboardingStep.UserGoals,
        },
        {
          label: {
            en: 'Initial Emotional State',
            uk: 'Початковий емоційний стан',
          },
          value: OnboardingStep.InitialEmotionalState,
        },
        {
          label: {
            en: 'Wanted Features',
            uk: 'Бажані функції',
          },
          value: OnboardingStep.WantedFeatures,
        },
      ],
      required: true,
    },
    {
      name: 'value',
      type: 'text',
      label: {
        en: 'Value',
        uk: 'Значення',
      },
      required: true,
      // unique: true,
      localized: true,
    },
  ],
}
