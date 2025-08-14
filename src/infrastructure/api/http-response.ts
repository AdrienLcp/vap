export const OK_STATUS = 200
export const CREATED_STATUS = 201
export const NO_CONTENT_STATUS = 204
export const BAD_REQUEST_STATUS = 400
export const UNAUTHORIZED_STATUS = 401
export const FORBIDDEN_STATUS = 403
export const NOT_FOUND_STATUS = 404
export const CONFLICT_STATUS = 409
export const UNPROCESSABLE_ENTITY_STATUS = 422
export const INTERNAL_SERVER_ERROR_STATUS = 500

export type BaseResponse<Status = number, T = null> = T extends null | undefined
  ? { headers?: HeadersInit, status: Status }
  : { headers?: HeadersInit, status: Status } & T

export type OkResponse<Data> = BaseResponse<typeof OK_STATUS, { data: Data }>
export type CreatedResponse<Data> = BaseResponse<typeof CREATED_STATUS, { data: Data }>
export type NoContentResponse = BaseResponse<typeof NO_CONTENT_STATUS>

export type BadRequestResponse<Error> = BaseResponse<typeof BAD_REQUEST_STATUS, { error: Error }>
export type NotFoundResponse = BaseResponse<typeof NOT_FOUND_STATUS>
export type UnauthorizedResponse = BaseResponse<typeof UNAUTHORIZED_STATUS>
export type ForbiddenResponse = BaseResponse<typeof FORBIDDEN_STATUS>
export type ConflictResponse<Error> = BaseResponse<typeof CONFLICT_STATUS, { error: Error }>
export type UnprocessableEntityResponse<Error> = BaseResponse<typeof UNPROCESSABLE_ENTITY_STATUS, { error: Error }>
export type InternalServerErrorResponse = BaseResponse<typeof INTERNAL_SERVER_ERROR_STATUS>

export type Response<T> = T | InternalServerErrorResponse

export type ApiResponse<Data = unknown, Error = unknown> =
  | OkResponse<Data>
  | CreatedResponse<Data>
  | NoContentResponse
  | BadRequestResponse<Error>
  | UnauthorizedResponse
  | ForbiddenResponse
  | NotFoundResponse
  | ConflictResponse<Error>
  | UnprocessableEntityResponse<Error>
  | InternalServerErrorResponse

const ok = <Data>(data: Data, headers?: HeadersInit): OkResponse<Data> => {
  return { data, headers, status: OK_STATUS }
}

const created = <Data>(data: Data, headers?: HeadersInit): CreatedResponse<Data> => {
  return { data, headers, status: CREATED_STATUS }
}

const noContent = (headers?: HeadersInit): NoContentResponse => {
  return { headers, status: NO_CONTENT_STATUS }
}

const badRequest = <Error>(error: Error, headers?: HeadersInit): BadRequestResponse<Error> => {
  return { headers, error, status: BAD_REQUEST_STATUS }
}

const unauthorized = (headers?: HeadersInit): UnauthorizedResponse => {
  return { headers, status: UNAUTHORIZED_STATUS }
}

const forbidden = (headers?: HeadersInit): ForbiddenResponse => {
  return { headers, status: FORBIDDEN_STATUS }
}

const conflict = <Error>(error: Error, headers?: HeadersInit): ConflictResponse<Error> => {
  return { headers, error, status: CONFLICT_STATUS }
}

const notFound = (headers?: HeadersInit): NotFoundResponse => {
  return { headers, status: NOT_FOUND_STATUS }
}

const unprocessableEntity = <Error>(error: Error, headers?: HeadersInit): UnprocessableEntityResponse<Error> => {
  return { headers, error, status: UNPROCESSABLE_ENTITY_STATUS }
}

const internalServerError = (headers?: HeadersInit): InternalServerErrorResponse => {
  return { headers, status: INTERNAL_SERVER_ERROR_STATUS }
}

export const HttpResponse = {
  ok,
  created,
  noContent,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  unprocessableEntity,
  internalServerError
}
