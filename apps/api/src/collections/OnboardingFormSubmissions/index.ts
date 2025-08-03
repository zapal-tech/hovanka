import { CollectionConfig } from 'payload'

import { Collection, CollectionLabel } from '@hovanka/shared/types'
import { OnboardingStep } from '@hovanka/shared/types/onboarding'

import { rootUsers } from '@api/access'

import { readAndCreateAndUpdateAccess } from './access'

export const OnboardingFormSubmissions: CollectionConfig = {
  slug: Collection.OnboardingFormSubmissions,
  labels: CollectionLabel.OnboardingFormSubmissions,
  access: {
    read: readAndCreateAndUpdateAccess,
    create: readAndCreateAndUpdateAccess,
    update: readAndCreateAndUpdateAccess,
    delete: rootUsers,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: Collection.Users,
      required: true,
      label: {
        en: 'User',
        uk: 'Користувач',
      },
      unique: true,
    },
    {
      name: OnboardingStep.UserGoals,
      type: 'relationship',
      hasMany: true,
      relationTo: Collection.OnboardingStepValues,
      filterOptions: {
        step: {
          equals: OnboardingStep.UserGoals,
        },
      },
      label: {
        en: 'User Goals',
        uk: 'Цілі користувача',
      },
    },
    {
      name: OnboardingStep.InitialEmotionalState,
      type: 'relationship',
      hasMany: true,
      relationTo: Collection.OnboardingStepValues,
      filterOptions: {
        step: {
          equals: OnboardingStep.InitialEmotionalState,
        },
      },
      label: {
        en: 'Initial Emotional State',
        uk: 'Початковий емоційний стан',
      },
    },
    {
      name: OnboardingStep.WantedFeatures,
      type: 'relationship',
      hasMany: true,
      relationTo: Collection.OnboardingStepValues,
      filterOptions: {
        step: {
          equals: OnboardingStep.WantedFeatures,
        },
      },
      label: {
        en: 'Wanted Features',
        uk: 'Бажані функції',
      },
    },
    {
      name: OnboardingStep.PersonalizedAINotificationsPermission,
      type: 'checkbox',
      label: {
        en: 'Personalized AI notifications',
        uk: 'Персоналізовані сповіщення від ШІ',
      },
    },
  ],
}
