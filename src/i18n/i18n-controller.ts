import { DEFAULT_LOCALE, type Locale } from '@/i18n/i18n-domain'
import { I18nService } from '@/i18n/i18n-service'
import { findSupportedLocale } from '@/i18n/i18n-utils'

const getInitialLocale = (): Locale => {
  return I18nService.getInitialLocale()
}

const getPolyglotByLocale = (locale: Locale) => {
  const supportedLocale = findSupportedLocale(locale)

  if (!supportedLocale) {
    return I18nService.getPolyglotByLocale(DEFAULT_LOCALE)
  }

  return I18nService.getPolyglotByLocale(locale)
}

const updateLocale = (locale: Locale) => {
  const supportedLocale = findSupportedLocale(locale)

  if (!supportedLocale) {
    return
  }

  I18nService.updateLocale(supportedLocale)
}

export const I18nController = {
  getInitialLocale,
  getPolyglotByLocale,
  updateLocale
}
