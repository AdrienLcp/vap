import { fr } from '@/infrastructure/i18n/dictionaries/fr'
import { initI18n } from '@/infrastructure/i18n/lib'

export const locale = 'fr-FR'

export const { t } = initI18n({
  fallbackLocale: locale,
  locale: locale,
  translations: { fr }
})
