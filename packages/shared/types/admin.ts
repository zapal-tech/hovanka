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

  AppUsageGoals: {
    plural: {
      en: 'App usage goals',
      uk: 'Цілі використання додатку',
    },
    singular: {
      en: 'App usage goal',
      uk: 'Ціль використання додатку',
    },
  },
} as const

export const GlobalLabel: Record<keyof typeof Global, GlobalLabel> = {}
