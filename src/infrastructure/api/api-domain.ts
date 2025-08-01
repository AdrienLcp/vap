import type { ZodError } from 'zod'

import type { ErrorResult, SuccessResult } from '@/helpers/result'

export type Unauthorized = 'UNAUTHORIZED'
export type BadRequest = 'BAD_REQUEST'
export type Forbidden = 'FORBIDDEN'
export type Conflict = 'CONFLICT'
export type InternalServerError = 'INTERNAL_SERVER_ERROR'

export type BaseResponse = { statusCode: number }

export type ErrorResponse<Errors = null> = BaseResponse & ErrorResult<Errors>
export type SuccessResponse<Data = null> = BaseResponse & SuccessResult<Data>

export type ApiResponse<Errors = null, Data = null> = Promise<ErrorResponse<Errors | InternalServerError> | SuccessResponse<Data>>

export type ResponseWithValidation<Errors, RequestBody = unknown, Data = null> = ApiResponse<Errors | ZodError<RequestBody | string>, Data>
