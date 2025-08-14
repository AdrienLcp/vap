import type { ZodError } from 'zod'

export type Issues<T = unknown> = ZodError<T>['issues']
