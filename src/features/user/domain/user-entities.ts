import type z from 'zod'

import type { UserDTOSchema, UserRoleSchema, UserUpdateSchema } from '@/features/user/domain/user-schemas'
import type { ForbiddenResponse, OkResponse, Response, UnauthorizedResponse } from '@/infrastructure/api/http-response'

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
  | ForbiddenResponse
  | UnauthorizedResponse
>
