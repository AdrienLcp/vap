import Polyglot from './polyglot.js'
import strings from './fr.json'

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`

type DotNestedKeys<T> = (
  T extends object ? {
    [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}`
  }[Exclude<keyof T, symbol>] : ''
) extends infer D
  ? Extract<D, string>
  : never

const currentPolyglot = new Polyglot({ phrases: strings, locale: 'fr' })

type I18NStringPaths = DotNestedKeys<typeof strings>

export const i18n = (
  key: I18NStringPaths,
  options?: Record<string, unknown>
) => currentPolyglot.t(key, options)

export type I18n = typeof i18n
