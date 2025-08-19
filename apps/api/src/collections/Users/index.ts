import { CollectionConfig } from 'payload'

import { Locale } from '@hovanka/shared/i18n'
import { Collection, CollectionLabel, UserRole } from '@hovanka/shared/types'
import { OnboardingStep } from '@hovanka/shared/types/onboarding'

import { rootUsers, rootUsersAdminAccess, rootUsersFieldAccess } from '@api/access'
import { isNotDev } from '@api/utils/env'

// import { welcomeEmail } from './hooks/welcomeEmail'

import { createAccess, readAccess, updateAndDeleteAccess } from './access'
import { ensureFirstUserIsRoot } from './hooks'

export const Users: CollectionConfig = {
  slug: Collection.Users,
  labels: CollectionLabel.Users,
  auth: {
    lockTime: 60 * 60,
    maxLoginAttempts: 5,
    tokenExpiration: 60 * 60 * 24 * 7,
    cookies: {
      sameSite: 'Lax',
      secure: isNotDev,
      domain: process.env.NEXT_PUBLIC_COOKIES_DOMAIN,
    },
  },
  admin: {
    defaultColumns: ['firstName', 'email', 'roles'],
    useAsTitle: 'firstName',
  },
  access: {
    read: readAccess,
    create: createAccess,
    update: updateAndDeleteAccess,
    delete: updateAndDeleteAccess,
    admin: rootUsersAdminAccess,
  },
  timestamps: true,
  fields: [
    {
      label: {
        en: 'First Name',
        uk: "Ім'я",
      },
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      label: {
        en: 'Roles',
        uk: 'Ролі',
      },
      type: 'select',
      hasMany: true,
      required: true,
      access: {
        create: rootUsersFieldAccess,
        update: rootUsersFieldAccess,
        read: rootUsersFieldAccess,
      },
      defaultValue: [UserRole.User],
      options: [
        {
          label: {
            en: 'Root admin',
            uk: 'Головний адміністратор',
          },
          value: UserRole.Root,
        },
        {
          label: {
            en: 'User',
            uk: 'Користувач',
          },
          value: UserRole.User,
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsRoot],
      },
    },
    {
      type: 'join',
      name: 'journalNotes',
      label: {
        en: 'Journal notes',
        uk: 'Нотатки з щоденника',
      },
      collection: Collection.Journals,
      on: 'user',
    },
    {
      name: 'signUpFlowCompleted',
      label: {
        en: 'Sign Up flow completed',
        uk: 'Реєстрацію пройдено',
      },
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'onboardingCompleted',
      label: {
        en: 'Onboarding completed',
        uk: 'Оnбординг завершено',
      },
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'onboardingStep',
      label: {
        en: 'Onboarding step',
        uk: 'Крок онбордингу',
      },
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      options: [
        {
          label: {
            en: 'User goals',
            uk: 'Цілі користувача',
          },
          value: OnboardingStep.UserGoals,
        },
        {
          label: {
            en: 'Emotional state',
            uk: 'Емоційний стан',
          },
          value: OnboardingStep.InitialEmotionalState,
        },
        {
          label: {
            en: 'Wanted features',
            uk: 'Бажані функції',
          },
          value: OnboardingStep.WantedFeatures,
        },
        {
          label: {
            en: 'Personalized AI notifications',
            uk: 'Персоналізовані сповіщення від ШІ',
          },
          value: OnboardingStep.PersonalizedAINotificationsPermission,
        },
      ],
    },
    {
      type: 'join',
      name: 'onboardingForm',
      label: {
        en: 'Onboarding Form',
        uk: 'Onboarding форма',
      },
      collection: Collection.OnboardingFormSubmissions,
      on: 'user',
      defaultLimit: 1,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
