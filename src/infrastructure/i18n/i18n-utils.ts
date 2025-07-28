import { failure, type NotFound, type Result, success } from '@/helpers/result'
import { type Locale, SUPPORTED_LOCALES } from '@/infrastructure/i18n/i18n-domain'

export const findSupportedLocale = (locale: string): Result<NotFound, Locale> => {
  const validLocale = SUPPORTED_LOCALES.find(supportedLocale => supportedLocale === locale)

  if (!validLocale) {
    return failure('NOT_FOUND')
  }

  return success(validLocale)
}
