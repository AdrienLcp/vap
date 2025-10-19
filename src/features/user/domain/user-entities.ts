import type z from 'zod'

import type { UserDTOSchema, UserIdSchema, UserRoleSchema, UserUpdateSchema } from '@/features/user/domain/user-schemas'
import type { BadRequestResponse, ForbiddenResponse, OkResponse, Response, UnauthorizedResponse } from '@/infrastructure/api/http-response'
import type { Issues } from '@/utils/validation-utils'

export type UserId = z.infer<typeof UserIdSchema>

export type UserRole = z.infer<typeof UserRoleSchema>

export type UserDTO = z.infer<typeof UserDTOSchema>

export type UserUpdateData = z.infer<typeof UserUpdateSchema>

export type UserListResponse = Response<
  | OkResponse<UserDTO[]>
  | ForbiddenResponse
  | UnauthorizedResponse
>

export type UserUpdateResponse = Response<
  | OkResponse<UserDTO>
  | BadRequestResponse<Issues<UserId>>
  | ForbiddenResponse
  | UnauthorizedResponse
>

export type UserResponse = Response<
  | OkResponse<UserDTO>
  | BadRequestResponse<Issues<UserId>>
  | ForbiddenResponse
  | UnauthorizedResponse
>
