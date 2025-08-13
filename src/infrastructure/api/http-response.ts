import type { ZodError } from 'zod'

export const OK_STATUS_CODE = 200
export const CREATED_STATUS_CODE = 201
export const BAD_REQUEST_STATUS_CODE = 400
export const UNAUTHORIZED_STATUS_CODE = 401
export const FORBIDDEN_STATUS_CODE = 403
export const NOT_FOUND_STATUS_CODE = 404
export const CONFLICT_STATUS_CODE = 409
export const UNPROCESSABLE_ENTITY_STATUS_CODE = 422
export const INTERNAL_SERVER_ERROR_STATUS_CODE = 500

export type OkResponse<Data = null> = Data extends null | undefined
  ? { statusCode: typeof OK_STATUS_CODE }
  : { data: Data; statusCode: typeof OK_STATUS_CODE }

export type CreatedResponse<Data = null> = Data extends null | undefined
  ? { statusCode: typeof CREATED_STATUS_CODE }
  : { data: Data; statusCode: typeof CREATED_STATUS_CODE }

export type BaseResponse<StatusCode = number, T = null> = T extends null | undefined
  ? { statusCode: StatusCode }
  : { statusCode: StatusCode } & T

export type BadRequestResponse<Request> = BaseResponse<typeof BAD_REQUEST_STATUS_CODE, { error: ZodError<Request> }>
export type NotFoundResponse = BaseResponse<typeof NOT_FOUND_STATUS_CODE>
export type UnauthorizedResponse = BaseResponse<typeof UNAUTHORIZED_STATUS_CODE>
export type ForbiddenResponse = BaseResponse<typeof FORBIDDEN_STATUS_CODE>
export type ConflictResponse<ErrorCode> = BaseResponse<typeof CONFLICT_STATUS_CODE, { errorCode: ErrorCode }>
export type UnprocessableEntityResponse<ErrorCode> = BaseResponse<typeof UNPROCESSABLE_ENTITY_STATUS_CODE, { errorCode: ErrorCode }>
export type InternalServerErrorResponse = BaseResponse<typeof INTERNAL_SERVER_ERROR_STATUS_CODE>

export type Response<T> = Promise<T | InternalServerErrorResponse>

function ok(): OkResponse
function ok<Data>(data: Data): OkResponse<Data>
function ok<Data>(data?: Data) {
  if (data == null) {
    return { statusCode: OK_STATUS_CODE }
  }

  return { data, statusCode: OK_STATUS_CODE }
}

function created(): CreatedResponse
function created<Data>(data: Data): CreatedResponse<Data>
function created<Data>(data?: Data) {
  if (data == null) {
    return { statusCode: CREATED_STATUS_CODE }
  }

  return { data, statusCode: CREATED_STATUS_CODE }
}

const badRequest = <Request>(error: ZodError<Request>): BadRequestResponse<Request> => {
  return { error, statusCode: BAD_REQUEST_STATUS_CODE }
}

const unauthorized = (): UnauthorizedResponse => {
  return { statusCode: UNAUTHORIZED_STATUS_CODE }
}

const forbidden = (): ForbiddenResponse => {
  return { statusCode: FORBIDDEN_STATUS_CODE }
}

const conflict = <ErrorCode>(errorCode: ErrorCode): ConflictResponse<ErrorCode> => {
  return { errorCode, statusCode: CONFLICT_STATUS_CODE }
}

const notFound = (): NotFoundResponse => {
  return { statusCode: NOT_FOUND_STATUS_CODE }
}

const unprocessableEntity = <ErrorCode>(errorCode: ErrorCode): UnprocessableEntityResponse<ErrorCode> => {
  return { errorCode, statusCode: UNPROCESSABLE_ENTITY_STATUS_CODE }
}

const internalServerError = (): InternalServerErrorResponse => {
  return { statusCode: INTERNAL_SERVER_ERROR_STATUS_CODE }
}

export const HttpResponse = {
  ok,
  created,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  unprocessableEntity,
  internalServerError
}
