import { UnexpectedError } from '@/domain/entities'

export const STATUS_ERROR = 'ERROR'
export const STATUS_SUCCESS = 'SUCCESS'
export const UNEXPECTED_ERROR: UnexpectedError = 'UNEXPECTED_ERROR'

export function failure(): { errors: UnexpectedError, status: typeof STATUS_ERROR }
export function failure<Error>(errors: Error): { errors: Error, status: typeof STATUS_ERROR }
export function failure<Error>(errors?: Error) {
  if (errors == null) {
    return { errors: UNEXPECTED_ERROR, status: STATUS_ERROR }
  }

  return { errors, status: STATUS_ERROR }
}

export function success(): { status: typeof STATUS_SUCCESS }
export function success<Data>(data: Data): { data: Data, status: typeof STATUS_SUCCESS }
export function success<Data>(data?: Data) {
  if (data == null) {
    return { status: STATUS_SUCCESS }
  }

  return { data, status: STATUS_SUCCESS }
}

export type ErrorResult<Error = undefined> = Error extends undefined | null
  ? { errors: UnexpectedError, status: typeof STATUS_ERROR }
  : { errors: Error, status: typeof STATUS_ERROR }

export type SuccessResult<Data = undefined> = Data extends undefined | null
  ? { status: typeof STATUS_SUCCESS }
  : { data: Data, status: typeof STATUS_SUCCESS }

export type Result<Error = undefined, Data = undefined> =
  | ErrorResult<Error>
  | SuccessResult<Data>
