import { DEFAULT_LOCALE, type Locale } from '@/infrastructure/i18n/i18n-domain'
import { I18nRepository } from '@/infrastructure/i18n/i18n-repository'
import { findSupportedLocale } from '@/infrastructure/i18n/i18n-utils'
import Polyglot from '@/infrastructure/i18n/lib/polyglot'

const getLocaleFromLanguage = (language: string) => language.slice(0, 2)

const updateDocumentLangAttribute = (locale: Locale) => {
  document.documentElement.setAttribute('lang', locale.slice(0, 2))
}

const getInitialLocale = (): Locale => {
  const favoriteLocaleResult = I18nRepository.findFavoriteLocale()

  if (favoriteLocaleResult.status === 'SUCCESS') {
    const supportedLocale = findSupportedLocale(favoriteLocaleResult.data)

    if (supportedLocale.status === 'SUCCESS') {
      return supportedLocale.data
    }
  }

  const primaryNavigatorLocale = getLocaleFromLanguage(navigator.language)
  const supportedLocale = findSupportedLocale(primaryNavigatorLocale)

  if (supportedLocale.status === 'SUCCESS') {
    return supportedLocale.data
  }

  const secondaryNavigatorLanguages = navigator.languages.map(getLocaleFromLanguage)

  for (const language of secondaryNavigatorLanguages) {
    const supportedLocale = findSupportedLocale(language)

    if (supportedLocale.status === 'SUCCESS') {
      return supportedLocale.data
    }
  }

  return DEFAULT_LOCALE
}

const setInitialLocale = () => {
  const initialLocale = getInitialLocale()
  updateDocumentLangAttribute(initialLocale)
}

const getPolyglotByLocale = (locale: Locale): Polyglot => {
  const dictionary = I18nRepository.getDictionaryByLocale(locale)
  return new Polyglot({ phrases: dictionary, locale })
}

const updateLocale = (newLocale: Locale) => {
  updateDocumentLangAttribute(newLocale)
  I18nRepository.storeFavoriteLocale(newLocale)
}

export const I18nService = {
  getInitialLocale,
  getPolyglotByLocale,
  setInitialLocale,
  updateLocale
}
