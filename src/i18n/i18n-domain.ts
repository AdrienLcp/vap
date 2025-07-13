import fr from '@/i18n/dictionaries/fr.json'

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`

type DotNestedKeys<T> = (
  T extends object ? {
    [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}`
  }[Exclude<keyof T, symbol>] : ''
) extends infer D
  ? Extract<D, string>
  : never

export const dictionaries = { fr } as const

export type Locale = keyof typeof dictionaries

export const SUPPORTED_LOCALES: Locale[] = ['fr']
export const DEFAULT_LOCALE: Locale = 'fr'

export type InvalidLocale = 'INVALID_LOCALE'

export type Dictionary = typeof dictionaries[Locale]

export type I18nKey = DotNestedKeys<Dictionary>
export type I18nOptions = Record<string, string | number> | number
