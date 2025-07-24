import type { z } from 'zod'

import type { ApiResponse, Unauthorized } from '@/api/api-domain'
import type { AUTH_CONSTANTS } from '@/auth/domain/auth-constants'
import type { AuthUserDTOSchema, AuthUserSchema, SignInRequestSchema, SignUpRequestSchema, UserRoleSchema } from '@/auth/domain/auth-schemas'
import type { NotFound, UnexpectedError } from '@/helpers/result'

export type UserRole = z.infer<typeof UserRoleSchema>
export type AuthUser = z.infer<typeof AuthUserSchema>
export type AuthUserDTO = z.infer<typeof AuthUserDTOSchema>

export type AuthUserError = NotFound | Unauthorized | UnexpectedError

export type SignInInfo = z.infer<typeof SignInRequestSchema>

export type InvalidCredentials = 'INVALID_CREDENTIALS'
export type PasswordTooShort = 'PASSWORD_TOO_SHORT'
export type UserAlreadyExists = 'USER_ALREADY_EXISTS'

export type SignInError =
  | AuthUserError
  | InvalidCredentials

export type SignUpInfo = z.infer<typeof SignUpRequestSchema>

export type SignUpError =
  | AuthUserError
  | PasswordTooShort
  | UserAlreadyExists

export type SocialProvider = typeof AUTH_CONSTANTS.SOCIAL_PROVIDERS[number]

export type AuthUserResponse = ApiResponse<Unauthorized, AuthUserDTO>
