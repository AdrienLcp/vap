export const STATUS_ERROR = 'ERROR'
export const STATUS_SUCCESS = 'SUCCESS'
export const UNEXPECTED_ERROR = 'UNEXPECTED_ERROR'

export type NotFound = 'NOT_FOUND'
export type Unauthorized = 'UNAUTHORIZED'
export type BadRequest = 'BAD_REQUEST'
export type Forbidden = 'FORBIDDEN'
export type Conflict = 'CONFLICT'
export type InternalServerError = 'INTERNAL_SERVER_ERROR'
export type UnexpectedError = typeof UNEXPECTED_ERROR

export function failure(): { error: UnexpectedError, status: typeof STATUS_ERROR }
export function failure<Error>(error: Error): { error: Error, status: typeof STATUS_ERROR }
export function failure<Error>(error?: Error) {
  if (error == null) {
    return { error: UNEXPECTED_ERROR, status: STATUS_ERROR }
  }

  return { error, status: STATUS_ERROR }
}

export function success(): { status: typeof STATUS_SUCCESS }
export function success<Data>(data: Data): { data: Data, status: typeof STATUS_SUCCESS }
export function success<Data>(data?: Data) {
  if (data == null) {
    return { status: STATUS_SUCCESS }
  }

  return { data, status: STATUS_SUCCESS }
}

export type ErrorResult<Error = null> = Error extends undefined | null
  ? { error: UnexpectedError, status: typeof STATUS_ERROR }
  : { error: Error | UnexpectedError, status: typeof STATUS_ERROR }

export type SuccessResult<Data = null> = Data extends undefined | null
  ? { status: typeof STATUS_SUCCESS }
  : { data: Data, status: typeof STATUS_SUCCESS }

export type Result<Error = null, Data = null> =
  | ErrorResult<Error>
  | SuccessResult<Data>
