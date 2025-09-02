import { Locale } from '../i18n'
import { Collection, Global } from './index'

type CollectionLabel = Record<'singular' | 'plural', Record<Locale, string> | string>
type GlobalLabel = Record<Locale, string> | string

export const CollectionLabel: Record<keyof typeof Collection, CollectionLabel> = {
  Users: {
    plural: {
      en: 'Users',
      uk: 'Користувачі',
    },
    singular: {
      en: 'User',
      uk: 'Користувач',
    },
  },

  Journals: {
    plural: {
      en: 'Journals',
      uk: 'Записи',
    },
    singular: {
      en: 'Journal',
      uk: 'Запис',
    },
  },

  OnboardingFormSubmissions: {
    plural: {
      en: 'Onboarding form submissions',
      uk: 'Заповнені онбординг форми',
    },
    singular: {
      en: 'Onboarding form submission',
      uk: 'Заповнена онбординг форма',
    },
  },

  OnboardingStepValues: {
    plural: {
      en: 'Onboarding step values',
      uk: 'Значення доступні до заповнення на онбордингу',
    },
    singular: {
      en: 'Onboarding step value',
      uk: 'Значення доступне до заповнення на онбордингу',
    },
  },

  Emotions: {
    plural: {
      en: 'Emotions',
      uk: 'Емоції',
    },
    singular: {
      en: 'Emotion',
      uk: 'Емоція',
    },
  },

  Articles: {
    plural: {
      en: 'Articles',
      uk: 'Статті',
    },
    singular: {
      en: 'Article',
      uk: 'Стаття',
    },
  },

  Tags: {
    plural: {
      en: 'Tags',
      uk: 'Теги',
    },
    singular: {
      en: 'Tag',
      uk: 'Тег',
    },
  },

  Practices: {
    plural: {
      en: 'Practices',
      uk: 'Практики',
    },
    singular: {
      en: 'Practice',
      uk: 'Практика',
    },
  },

  EmotionsStatistics: {
    plural: {
      en: 'Emotions statistics',
      uk: 'Статистика емоцій',
    },
    singular: {
      en: 'Emotions statistic',
      uk: 'Статистика емоції',
    },
  },
} as const

export const GlobalLabel: Record<keyof typeof Global, GlobalLabel> = {
  Onboarding: {
    en: 'Onboarding',
    uk: 'Онбординг',
  },
}
