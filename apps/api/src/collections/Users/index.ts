import { CollectionConfig } from 'payload'

import { Locale } from '@hovanka/shared/i18n'
import { Collection, CollectionLabel, UserRole } from '@hovanka/shared/types'

import { rootUsersFieldAccess } from '@api/access'
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
    // onboardingStep - number, features - group, features: { moodTracker - boolean }
    {
      type: 'select',
      name: 'language',
      label: {
        en: 'Language',
        uk: 'Мова',
      },
      defaultValue: Locale.English,
      options: [
        {
          label: {
            en: 'English',
            uk: 'Англійська',
          },
          value: Locale.English,
        },
        {
          label: {
            en: 'Ukrainian',
            uk: 'Українська',
          },
          value: Locale.Ukrainian,
        },
      ],
    },
    {
      name: 'onboardingCompleted',
      type: 'checkbox',
    },
    {
      name: 'onboardingStep',
      type: 'select',
      options: [
        {
          label: {
            en: 'Name and age',
            uk: "Ім'я та вік",
          },
          value: 'nameAndAge',
        },
        {
          label: {
            en: 'moodTrackerFeature',
            uk: 'Опція "Трекер настрою"',
          },
          value: 'moodTrackerFeature',
        },
        {
          label: {
            en: 'App usage goals',
            uk: 'Цілі використання додатку',
          },
          value: 'appUsageGoals',
        },
      ],
    },
    {
      name: 'features',
      type: 'group',
      fields: [
        {
          name: 'moodTracker',
          type: 'checkbox',
        },
      ],
    },
  ],
}
