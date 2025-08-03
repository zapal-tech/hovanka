import { Field, GlobalConfig } from 'payload'

import { Collection, Global, GlobalLabel } from '@hovanka/shared/types'
import { OnboardingStep, OnboardingStepType } from '@hovanka/shared/types/onboarding'

import { rootUsers } from '@api/access'

const dataSelectionTypeField: Field = {
  name: 'type',
  label: {
    en: 'Type',
    uk: 'Тип',
  },
  required: true,
  type: 'select',
  options: [
    {
      label: { en: 'Multiple choice list', uk: 'Вибір з кількох варіантів (список)' },
      value: OnboardingStepType.MultipleChoiceList,
    },
    {
      label: { en: 'Multiple choice chips', uk: 'Вибір з кількох варіантів (чіпи)' },
      value: OnboardingStepType.MultipleChoiceChips,
    },
  ],
}

export const Onboarding: GlobalConfig = {
  slug: Global.Onboarding,
  label: GlobalLabel.Onboarding,
  access: {
    update: rootUsers,
    readDrafts: rootUsers,
    readVersions: rootUsers,
  },
  fields: [
    {
      name: 'steps',
      label: false,
      type: 'group',
      fields: [
        {
          name: OnboardingStep.UserGoals,
          type: 'group',
          label: {
            en: 'User goals',
            uk: 'Цілі користувача',
          },
          fields: [
            dataSelectionTypeField,
            {
              type: 'relationship',
              name: 'data',
              label: false,
              hasMany: true,
              relationTo: Collection.OnboardingStepValues,
              filterOptions: {
                step: {
                  equals: OnboardingStep.UserGoals,
                },
              },
            },
          ],
        },
        {
          name: OnboardingStep.InitialEmotionalState,
          type: 'group',
          label: {
            en: 'Emotional state',
            uk: 'Емоційний стан',
          },
          fields: [
            dataSelectionTypeField,
            {
              type: 'relationship',
              name: 'data',
              label: false,
              hasMany: true,
              relationTo: Collection.OnboardingStepValues,
              filterOptions: {
                step: {
                  equals: OnboardingStep.InitialEmotionalState,
                },
              },
            },
          ],
        },
        {
          name: OnboardingStep.WantedFeatures,
          type: 'group',
          label: {
            en: 'Wanted features',
            uk: 'Бажані функції',
          },
          fields: [
            dataSelectionTypeField,
            {
              type: 'relationship',
              name: 'data',
              label: false,
              hasMany: true,
              relationTo: Collection.OnboardingStepValues,
              filterOptions: {
                step: {
                  equals: OnboardingStep.WantedFeatures,
                },
              },
            },
          ],
        },
      ],
    },
  ],
}
