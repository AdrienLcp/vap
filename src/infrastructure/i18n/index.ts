import { fr } from '@/infrastructure/i18n/dictionaries/fr'
import { initI18n } from '@/infrastructure/i18n/lib'

export const lang = 'fr'

export const i18n = initI18n({
  locale: 'fr',
  fallbackLocale: 'fr',
  translations: { fr }
})
