import type { Dictionary } from './index'

declare type IPolyglotOptions = {
  phrases: Dictionary
  locale?: string
}

declare class Polyglot {
  constructor (options: IPolyglotOptions)
  t (key: string, options?: Record<string, unknown>): string
}

export = Polyglot
export = IPolyglotOptions
