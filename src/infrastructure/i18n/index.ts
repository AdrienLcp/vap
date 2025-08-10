import { fr } from '@/infrastructure/i18n/dictionaries/fr'
import { initI18n } from '@/infrastructure/i18n/lib'

export const lang = 'fr'

export const { t } = initI18n({
  fallbackLocale: lang,
  locale: lang,
  translations: { fr }
})
