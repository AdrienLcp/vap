import { I18nController } from '@/infrastructure/i18n/i18n-controller'
import type { I18nKey, I18nOptions } from '@/infrastructure/i18n/i18n-domain'

export const lang = 'fr'

const polyglot = I18nController.getPolyglotByLocale(lang)

export const i18n = (key: I18nKey, options?: I18nOptions) => polyglot.t(key, options)
