import type { Role } from '@prisma/client'
import { z } from 'zod'

import type { NotFound } from '@/api'
import type { ResponseWithValidationIssues } from '@/api/server'
import { AuthUserDTOSchema, SignInRequestSchema, SignUpRequestSchema, SocialProviderRequestSchema, SocialProviderSchema } from '@/auth/domain/auth-schema'
import type { UnexpectedError } from '@/helpers/result'

export type AuthUserError = NotFound | UnexpectedError

export type SignInInfo = z.infer<typeof SignInRequestSchema>

export type SignInError =
  | AuthUserError
  | 'INVALID_CREDENTIALS'

export type SignUpInfo = z.infer<typeof SignUpRequestSchema>

export type SignUpError =
  | AuthUserError
  | 'EMAIL_ALREADY_EXISTS'

export type AuthUser = {
  email: string
  name: string
  role: Role
}

export type SocialProvider = z.infer<typeof SocialProviderSchema>

export type AuthUserDTO = z.infer<typeof AuthUserDTOSchema>

export type SocialSignInRequest = z.infer<typeof SocialProviderRequestSchema>

export type EmailSignInResponse = ResponseWithValidationIssues<SignInError, SignInInfo, AuthUserDTO>
export type EmailSignUpResponse = ResponseWithValidationIssues<SignUpError, SignUpInfo, AuthUserDTO>
export type SocialSignInResponse = ResponseWithValidationIssues<AuthUserError, SocialSignInRequest, AuthUserDTO>
