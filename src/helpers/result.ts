export type UnexpectedError = 'UNEXPECTED_ERROR'
export type NotFound = 'NOT_FOUND'

export const STATUS_ERROR = 'ERROR'
export const STATUS_SUCCESS = 'SUCCESS'
export const UNEXPECTED_ERROR: UnexpectedError = 'UNEXPECTED_ERROR'

export function failure(): { errors: UnexpectedError, status: typeof STATUS_ERROR }
export function failure<Errors>(errors: Errors): { errors: Errors, status: typeof STATUS_ERROR }
export function failure<Errors>(errors?: Errors) {
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

export type ErrorResult<Errors = null> = Errors extends undefined | null
  ? { errors: UnexpectedError, status: typeof STATUS_ERROR }
  : { errors: Errors | UnexpectedError, status: typeof STATUS_ERROR }

export type SuccessResult<Data = null> = Data extends undefined | null
  ? { status: typeof STATUS_SUCCESS }
  : { data: Data, status: typeof STATUS_SUCCESS }

export type Result<Errors = null, Data = null> =
  | ErrorResult<Errors>
  | SuccessResult<Data>

export const unknownError = (...logs: Parameters<typeof console.error>): ErrorResult<UnexpectedError> => {
  console.error('Unknown error:', ...logs)
  return failure()
}
