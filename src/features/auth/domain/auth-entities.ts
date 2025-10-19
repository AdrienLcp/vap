import type { z } from 'zod'

import type { Forbidden, Unauthorized } from '@/domain/entities'
import type { AUTH_CONSTANTS, AUTH_ERRORS } from '@/features/auth/domain/auth-constants'
import type { AuthPermissionsSchema, AuthUserDTOSchema, ChangePasswordSchema, SignInInfoSchema, SignUpInfoSchema } from '@/features/auth/domain/auth-schemas'
import type { UserRole } from '@/features/user/domain/user-entities'
import type { BadRequestResponse, ConflictResponse, CreatedResponse, NoContentResponse, OkResponse, Response, UnauthorizedResponse } from '@/infrastructure/api/http-response'

export type AuthPermissions = z.infer<typeof AuthPermissionsSchema>

export type AuthUserDTO = z.infer<typeof AuthUserDTOSchema>

export type AuthUser = AuthUserDTO & {
  id: string
}

export type User = Omit<AuthUser, 'permissions'> & {
  role: UserRole
}

export type AuthUserError = Unauthorized

export type AuthUserPermissionError = AuthUserError | Forbidden

export type AuthUserResponse = Response<OkResponse<AuthUserDTO> | UnauthorizedResponse>

export type InvalidCredentials = 'INVALID_CREDENTIALS'
export type InvalidEmail = typeof AUTH_ERRORS.INVALID_EMAIL
export type InvalidPassword = 'INVALID_PASSWORD'
export type PasswordTooShort = typeof AUTH_ERRORS.PASSWORD_TOO_SHORT
export type UserAlreadyExists = 'USER_ALREADY_EXISTS'

export type SignInInfo = z.infer<typeof SignInInfoSchema>

export type SignUpInfo = z.infer<typeof SignUpInfoSchema>

export type EmailSignInResponse = Response<
  | OkResponse<AuthUserDTO>
  | BadRequestResponse<InvalidCredentials>
>

export type SignUpResponse =
  | CreatedResponse<AuthUserDTO>
  | BadRequestResponse<InvalidEmail | PasswordTooShort>
  | ConflictResponse<UserAlreadyExists>

export type SignOutResponse = Response<
  | NoContentResponse
  | UnauthorizedResponse
>

export type DeleteUserResponse = Response<
  | NoContentResponse
  | BadRequestResponse<InvalidPassword>
  | UnauthorizedResponse
>

export type ChangePasswordInfo = z.infer<typeof ChangePasswordSchema>

export type ChangePasswordError = PasswordTooShort | InvalidPassword

export type ChangePasswordResponse = Response<
  | NoContentResponse
  | BadRequestResponse<ChangePasswordError>
>

export type ChangeEmailResponse = Response<
  | NoContentResponse
  | BadRequestResponse<InvalidEmail>
  | UnauthorizedResponse
>

export type SocialProvider = typeof AUTH_CONSTANTS.SOCIAL_PROVIDERS[number]
