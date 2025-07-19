import type { Role } from '@prisma/client'
import { z } from 'zod'

import type { ApiResponse, ResponseWithValidation, Unauthorized } from '@/api/api-domain'
import { AuthUserDTOSchema, SignInRequestSchema, SignUpRequestSchema, SocialProviderRequestSchema, SocialProviderSchema } from '@/auth/domain/auth-schema'
import type { NotFound, UnexpectedError } from '@/helpers/result'

export type AuthUserError = NotFound | UnexpectedError

export type SignInInfo = z.infer<typeof SignInRequestSchema>

export type InvalidCredentials = 'INVALID_CREDENTIALS'
export type UserAlreadyExists = 'USER_ALREADY_EXISTS'

export type SignInError =
  | AuthUserError
  | InvalidCredentials

export type SignUpInfo = z.infer<typeof SignUpRequestSchema>

export type SignUpError =
  | AuthUserError
  | UserAlreadyExists

export type AuthUser = {
  email: string
  name: string
  role: Role
}

export type SocialProvider = z.infer<typeof SocialProviderSchema>

export type AuthUserDTO = z.infer<typeof AuthUserDTOSchema>

export type SocialSignInRequest = z.infer<typeof SocialProviderRequestSchema>

export type EmailSignInResponse = ResponseWithValidation<SignInError, SignInInfo, AuthUserDTO>
export type EmailSignUpResponse = ResponseWithValidation<SignUpError, SignUpInfo, AuthUserDTO>
export type SignOutResponse = ApiResponse<Unauthorized>
export type SocialSignInResponse = ResponseWithValidation<AuthUserError, SocialSignInRequest, AuthUserDTO>
