import type { z } from 'zod'

import type { ApiResponse, Unauthorized } from '@/api/api-domain'
import type { AUTH_CONSTANTS } from '@/auth/domain/auth-constants'
import type { AuthPermissionsSchema, AuthUserDTOSchema, AuthUserSchema, SignInRequestSchema, SignUpRequestSchema } from '@/auth/domain/auth-schemas'
import type { UserRoleSchema } from '@/user/user-schemas'

export type AuthPermissions = z.infer<typeof AuthPermissionsSchema>
export type UserRole = z.infer<typeof UserRoleSchema>
export type AuthUser = z.infer<typeof AuthUserSchema>
export type AuthUserDTO = z.infer<typeof AuthUserDTOSchema>

export type BaseAuthUser = {
  name: string
  role: UserRole
}

export type AuthUserError = Unauthorized

export type InvalidCredentials = 'INVALID_CREDENTIALS'
export type PasswordTooShort = typeof AUTH_CONSTANTS.PASSWORD_TOO_SHORT
export type UserAlreadyExists = 'USER_ALREADY_EXISTS'

export type SignInInfo = z.infer<typeof SignInRequestSchema>

export type SignInError =
  | InvalidCredentials
  | Unauthorized

export type SignUpInfo = z.infer<typeof SignUpRequestSchema>

export type SignUpError =
  | PasswordTooShort
  | Unauthorized
  | UserAlreadyExists

export type SocialProvider = typeof AUTH_CONSTANTS.SOCIAL_PROVIDERS[number]

export type AuthUserResponse = ApiResponse<AuthUserError, AuthUserDTO>
