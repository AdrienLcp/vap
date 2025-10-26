import type { z } from 'zod'

import type { Forbidden, Unauthorized } from '@/domain/entities'
import type { AUTH_CONSTANTS, AUTH_ERRORS } from '@/features/auth/domain/auth-constants'
import type {
  AuthPermissionsSchema,
  AuthUserDTOSchema,
  ChangePasswordSchema,
  SignInInfoSchema,
  SignUpInfoSchema
} from '@/features/auth/domain/auth-schemas'
import type { UserRole } from '@/features/user/domain/user-entities'
import type {
  BadRequestResponse,
  ConflictResponse,
  CreatedResponse,
  NoContentResponse,
  OkResponse,
  Response,
  UnauthorizedResponse
} from '@/infrastructure/api/http-response'

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

type EmailSignInResult = OkResponse<AuthUserDTO> | BadRequestResponse<InvalidCredentials>

export type EmailSignInResponse = Response<EmailSignInResult>

export type SignUpBadRequestError = InvalidEmail | PasswordTooShort

type SignUpResult =
  | CreatedResponse<AuthUserDTO>
  | BadRequestResponse<SignUpBadRequestError>
  | ConflictResponse<UserAlreadyExists>

export type SignUpResponse = Response<SignUpResult>

type SignOuResult = NoContentResponse | UnauthorizedResponse

export type SignOutResponse = Response<SignOuResult>

type UserDeletionResult =
  | NoContentResponse
  | BadRequestResponse<InvalidPassword>
  | UnauthorizedResponse

export type UserDeletionResponse = Response<UserDeletionResult>

export type ChangePasswordInfo = z.infer<typeof ChangePasswordSchema>

export type ChangePasswordError = PasswordTooShort | InvalidPassword

type PasswordUpdateResult = NoContentResponse | BadRequestResponse<ChangePasswordError>

export type PasswordUpdateResponse = Response<PasswordUpdateResult>

type EmailUpdateResult =
  | NoContentResponse
  | BadRequestResponse<InvalidEmail>
  | ConflictResponse<UserAlreadyExists>
  | UnauthorizedResponse

export type EmailUpdateResponse = Response<EmailUpdateResult>

export type SocialProvider = (typeof AUTH_CONSTANTS.SOCIAL_PROVIDERS)[number]
