declare type IPolyglotOptions = {
  phrases: object
  locale?: string
}

declare class Polyglot {
  constructor (options: IPolyglotOptions)
  t (key: string, options?: Record<string, string | number> | number): string
}

export = Polyglot
export = IPolyglotOptions
