import { SUPPORTED_LOCALES } from '@/i18n/i18n-domain'

export const findSupportedLocale = (locale: string) => SUPPORTED_LOCALES.find(l => l === locale)
