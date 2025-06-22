import { UnexpectedError } from '@/domain/entities'

export const STATUS_ERROR = 'error'
export const STATUS_SUCCESS = 'success'
export const UNEXPECTED_ERROR: UnexpectedError = 'UNEXPECTED_ERROR'

export function failure(): { errors: UnexpectedError, status: typeof STATUS_ERROR }
export function failure<E>(errors: E): { errors: E, status: typeof STATUS_ERROR }
export function failure<E>(errors?: E) {
  if (errors == null) {
    return { errors: UNEXPECTED_ERROR, status: STATUS_ERROR }
  }

  return { errors, status: STATUS_ERROR }
}

export function success(): { status: typeof STATUS_SUCCESS }
export function success<T>(data: T): { data: T, status: typeof STATUS_SUCCESS }
export function success<T>(data?: T) {
  if (data == null) {
    return { status: STATUS_SUCCESS }
  }

  return { data, status: STATUS_SUCCESS }
}

export type ErrorResult<E = undefined> = E extends undefined | null
  ? { errors: UnexpectedError, status: typeof STATUS_ERROR }
  : { errors: E, status: typeof STATUS_ERROR }

export type SuccessResult<T = undefined> = T extends undefined | null
  ? { status: typeof STATUS_SUCCESS }
  : { data: T, status: typeof STATUS_SUCCESS }

export type Result<E = undefined, T = undefined> =
  | ErrorResult<E>
  | SuccessResult<T>
