import type { ZodError } from 'zod'

import type { ErrorResult, SuccessResult } from '@/helpers/result'

export type Unauthorized = 'UNAUTHORIZED'
export type BadRequest = 'BAD_REQUEST'
export type Forbidden = 'FORBIDDEN'
export type Conflict = 'CONFLICT'
export type InternalServerError = 'INTERNAL_SERVER_ERROR'

export type BaseResponse = { statusCode: number }

export type ErrorResponse<Errors = undefined> = BaseResponse & ErrorResult<Errors>
export type SuccessResponse<Data = undefined> = BaseResponse & SuccessResult<Data>

export type ApiResponse<Errors = undefined, Data = undefined> = Promise<ErrorResponse<Errors | InternalServerError> | SuccessResponse<Data>>

export type ResponseWithValidation<Errors, RequestBody = unknown, Data = undefined> = ApiResponse<Errors | ZodError<RequestBody>, Data>
