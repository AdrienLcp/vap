import { failure, type NotFound, type Result, success } from '@/helpers/result'
import { DEFAULT_LOCALE, dictionaries, type Locale } from '@/infrastructure/i18n/i18n-domain'
import { LocaleStorage } from '@/infrastructure/local-storage'

const getDictionaryByLocale = (locale: Locale) => {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE]
}

const findFavoriteLocale = (): Result<NotFound, string> => {
  const storedLocale = LocaleStorage.find('locale')

  if (!storedLocale) {
    return failure('NOT_FOUND')
  }

  return success(storedLocale)
}

const storeFavoriteLocale = (locale: string) => {
  LocaleStorage.set('locale', locale)
}

export const I18nRepository = {
  findFavoriteLocale,
  getDictionaryByLocale,
  storeFavoriteLocale
}
