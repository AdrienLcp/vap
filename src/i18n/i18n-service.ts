import { DEFAULT_LOCALE, type Locale } from '@/i18n/i18n-domain'
import { I18nRepository } from '@/i18n/i18n-repository'
import { findSupportedLocale } from '@/i18n/i18n-utils'
import Polyglot from '@/i18n/lib/polyglot'

const getLocaleFromLanguage = (language: string) => language.slice(0, 2)

const updateDocumentLanguageAttribute = (locale: Locale) => {
  document.documentElement.setAttribute('lang', locale)
}

const getInitialLocale = (): Locale => {
  const favoriteLocaleResult = I18nRepository.findFavoriteLocale()

  if (favoriteLocaleResult.status === 'SUCCESS') {
    const supportedLocale = findSupportedLocale(favoriteLocaleResult.data)

    if (supportedLocale) {
      updateDocumentLanguageAttribute(supportedLocale)
      return supportedLocale
    }
  }

  const primaryNavigatorLocale = getLocaleFromLanguage(navigator.language)
  const supportedLocale = findSupportedLocale(primaryNavigatorLocale)

  if (supportedLocale) {
    updateDocumentLanguageAttribute(supportedLocale)
    return supportedLocale
  }

  const secondaryNavigatorLanguages = navigator.languages.map(getLocaleFromLanguage)

  for (const language of secondaryNavigatorLanguages) {
    const supportedLocale = findSupportedLocale(language)

    if (supportedLocale) {
      updateDocumentLanguageAttribute(supportedLocale)
      return supportedLocale
    }
  }

  updateDocumentLanguageAttribute(DEFAULT_LOCALE)
  return DEFAULT_LOCALE
}

const getPolyglotByLocale = (locale: Locale) => {
  const dictionary = I18nRepository.getDictionaryByLocale(locale)
  return new Polyglot({ phrases: dictionary, locale })
}

const updateLocale = (newLocale: Locale) => {
  updateDocumentLanguageAttribute(newLocale)
  I18nRepository.storeFavoriteLocale(newLocale)
}

export const I18nService = {
  getInitialLocale,
  getPolyglotByLocale,
  updateLocale
}
