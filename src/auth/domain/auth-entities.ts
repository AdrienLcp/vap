import type { z } from 'zod'

import type { AUTH_CONSTANTS } from '@/auth/domain/auth-constants'
import type { AuthPermissionsSchema, AuthUserDTOSchema } from '@/auth/domain/auth-schemas'
import type { Unauthorized } from '@/helpers/result'
import type { BadRequestResponse, ConflictResponse, CreatedResponse, NoContentResponse, OkResponse, Response, UnauthorizedResponse } from '@/infrastructure/api/http-response'
import type { UserRole } from '@/user/domain/user-entities'

export type AuthPermissions = z.infer<typeof AuthPermissionsSchema>

export type AuthUser = {
  name: string
  role: UserRole
}

export type AuthUserDTO = z.infer<typeof AuthUserDTOSchema>

export type AuthUserError = Unauthorized

export type AuthUserResponse = Response<OkResponse<AuthUserDTO> | UnauthorizedResponse>

export type InvalidCredentials = 'INVALID_CREDENTIALS'
export type InvalidEmail = typeof AUTH_CONSTANTS.INVALID_EMAIL
export type InvalidPassword = 'INVALID_PASSWORD'
export type PasswordTooShort = typeof AUTH_CONSTANTS.PASSWORD_TOO_SHORT
export type UserAlreadyExists = 'USER_ALREADY_EXISTS'

export type SignInInfo = {
  email: string
  password: string
}

export type EmailSignInResponse = Response<
  | OkResponse<AuthUserDTO>
  | BadRequestResponse<InvalidCredentials>
>

export type SignUpInfo = {
  email: string
  name: string
  password: string
}

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
  | UnauthorizedResponse
>

export type ChangePasswordInfo = {
  currentPassword: string
  newPassword: string
}

export type ChangePasswordResponse = Response<
  | NoContentResponse
  | BadRequestResponse<PasswordTooShort | InvalidPassword>
>

export type ChangeEmailResponse = Response<
  | NoContentResponse
  | UnauthorizedResponse
>

export type SocialProvider = typeof AUTH_CONSTANTS.SOCIAL_PROVIDERS[number]
