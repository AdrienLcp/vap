import type z from 'zod'

import type {
  UserDTOSchema,
  UserFiltersSchema,
  UserIdSchema,
  UserRoleSchema,
  UserUpdateSchema
} from '@/features/user/domain/user-schemas'
import type {
  BadRequestResponse,
  ForbiddenResponse,
  OkResponse,
  Response,
  UnauthorizedResponse
} from '@/infrastructure/api/http-response'
import type { Issues } from '@/utils/validation-utils'

export type UserId = z.infer<typeof UserIdSchema>

export type UserRole = z.infer<typeof UserRoleSchema>

export type UserDTO = z.infer<typeof UserDTOSchema>

export type UserUpdateData = z.infer<typeof UserUpdateSchema>

type UserListResult = OkResponse<UserDTO[]> | ForbiddenResponse | UnauthorizedResponse

export type UserListResponse = Response<UserListResult>

type UserUpdateResult =
  | OkResponse<UserDTO>
  | BadRequestResponse<Issues<UserUpdateData>>
  | ForbiddenResponse
  | UnauthorizedResponse

export type UserUpdateResponse = Response<UserUpdateResult>

type UserResult =
  | OkResponse<UserDTO>
  | BadRequestResponse<Issues<UserId>>
  | ForbiddenResponse
  | UnauthorizedResponse

export type UserResponse = Response<UserResult>

export type UserFilters = z.infer<typeof UserFiltersSchema>
