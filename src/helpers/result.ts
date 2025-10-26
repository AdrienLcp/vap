const STATUS_ERROR = 'ERROR'
const STATUS_SUCCESS = 'SUCCESS'
const UNEXPECTED_ERROR = 'UNEXPECTED_ERROR'
type UnexpectedError = typeof UNEXPECTED_ERROR

export function failure(): { error: UnexpectedError; status: typeof STATUS_ERROR }
export function failure<Error>(error: Error): { error: Error; status: typeof STATUS_ERROR }
export function failure<Error>(error?: Error) {
  if (error == null) {
    return { error: UNEXPECTED_ERROR, status: STATUS_ERROR }
  }

  return { error, status: STATUS_ERROR }
}

export function success(): { status: typeof STATUS_SUCCESS }
export function success<Data>(data: Data): { data: Data; status: typeof STATUS_SUCCESS }
export function success<Data>(data?: Data) {
  if (data == null) {
    return { status: STATUS_SUCCESS }
  }

  return { data, status: STATUS_SUCCESS }
}

export type ErrorResult<Error = null> = Error extends undefined | null
  ? { error: UnexpectedError; status: typeof STATUS_ERROR }
  : { error: Error | UnexpectedError; status: typeof STATUS_ERROR }

export type SuccessResult<Data = null> = Data extends undefined | null
  ? { status: typeof STATUS_SUCCESS }
  : { data: Data; status: typeof STATUS_SUCCESS }

export type Result<Data = null, Error = null> = ErrorResult<Error> | SuccessResult<Data>
