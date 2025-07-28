import { DEFAULT_LOCALE, type Locale } from '@/infrastructure/i18n/i18n-domain'
import { I18nService } from '@/infrastructure/i18n/i18n-service'
import { findSupportedLocale } from '@/infrastructure/i18n/i18n-utils'

const getInitialLocale = (): Locale => {
  return I18nService.getInitialLocale()
}

const getPolyglotByLocale = (locale: Locale) => {
  const supportedLocale = findSupportedLocale(locale)

  if (supportedLocale.status === 'ERROR') {
    return I18nService.getPolyglotByLocale(DEFAULT_LOCALE)
  }

  return I18nService.getPolyglotByLocale(locale)
}

const setInitialLocale = () => {
  I18nService.setInitialLocale()
}

const updateLocale = (locale: Locale) => {
  const supportedLocale = findSupportedLocale(locale)

  if (supportedLocale.status === 'SUCCESS') {
    I18nService.updateLocale(supportedLocale.data)
  }
}

export const I18nController = {
  getInitialLocale,
  getPolyglotByLocale,
  setInitialLocale,
  updateLocale
}
