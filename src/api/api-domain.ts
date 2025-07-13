import type { ZodError } from 'zod'

import type { ErrorResult, SuccessResult } from '@/helpers/result'

export type Unauthorized = 'UNAUTHORIZED'
export type BadRequest = 'BAD_REQUEST'
export type Forbidden = 'FORBIDDEN'
export type Conflict = 'CONFLICT'
export type InternalServerError = 'INTERNAL_SERVER_ERROR'

export type StatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 409 | 500

export type BaseResponse = { statusCode: StatusCode }

export type ErrorResponse<Errors = undefined> = BaseResponse & ErrorResult<Errors>
export type SuccessResponse<Data = undefined> = BaseResponse & SuccessResult<Data>

export type ApiResponse<Errors = undefined, Data = undefined> =
  | ErrorResponse<Errors>
  | SuccessResponse<Data>

export type ResponseWithValidationIssues<Errors, RequestBody = unknown, Data = undefined> = ApiResponse<Errors | ZodError<RequestBody>, Data>

export const OK_STATUS_CODE = 200
export const CREATED_STATUS_CODE = 201
