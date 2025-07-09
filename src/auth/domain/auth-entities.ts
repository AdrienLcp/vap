import type { Role } from '@prisma/client'
import { z } from 'zod'

import type { NotFound } from '@/api'
import type { ResponseWithValidationIssues } from '@/api/server'
import { AuthUserDTOSchema, SignInRequestSchema, SignUpRequestSchema, SocialProviderSchema } from '@/auth/domain/auth-schema'
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

export type SignInResponse<ValidationError = undefined> = ResponseWithValidationIssues<SignInError, AuthUserDTO>
export type SignUpResponse<ValidationError = undefined> = ResponseWithValidationIssues<SignUpError, AuthUserDTO>
