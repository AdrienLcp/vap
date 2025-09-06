import type { ZodError } from 'zod'

export type Issues<T = unknown> = ZodError<T>['issues']

export type ValidationErrors <T extends PropertyKey> =
  | Partial<Record<T | 'form', string | string[]>>
  | null
  | undefined
