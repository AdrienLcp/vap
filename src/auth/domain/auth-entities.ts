import type { z } from 'zod'

import type { ApiResponse, Unauthorized } from '@/infrastructure/api/api-domain'
import type { AuthPermissionsSchema, AuthUserDTOSchema } from '@/auth/domain/auth-schemas'
import type { UserRole } from '@/user/user-entities'
import type { AUTH_CONSTANTS } from './auth-constants'

export type AuthPermissions = z.infer<typeof AuthPermissionsSchema>

export type AuthUser = {
  name: string
  role: UserRole
}

export type AuthUserDTO = z.infer<typeof AuthUserDTOSchema>

export type AuthUserError = Unauthorized

export type AuthUserResponse = ApiResponse<AuthUserError, AuthUserDTO>

export type InvalidCredentials = 'INVALID_CREDENTIALS'
export type PasswordTooShort = typeof AUTH_CONSTANTS.PASSWORD_TOO_SHORT
export type UserAlreadyExists = 'USER_ALREADY_EXISTS'

export type SignInInfo = {
  email: string
  password: string
}

export type SignInError =
  | InvalidCredentials
  | Unauthorized

export type SignUpInfo = {
  email: string
  name: string
  password: string
}

export type SignUpError =
// adds invalid email + test
  | PasswordTooShort
  | Unauthorized
  | UserAlreadyExists

export type ChangePasswordInfo = {
  currentPassword: string
  newPassword: string
}

export type SocialProvider = typeof AUTH_CONSTANTS.SOCIAL_PROVIDERS[number]
