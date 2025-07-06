import type { Role } from '@prisma/client'
import { z } from 'zod'

import { SignInInfoSchema, SignUpInfoSchema, SocialProviderSchema } from '@/auth/domain/auth-schema'
import type { ControllerResultWithValidationIssues } from '@/helpers/controller-result'
import type { NotFound, UnexpectedError } from '@/helpers/result'

export type AuthUserError = NotFound | UnexpectedError

export type SignInInfo = z.infer<typeof SignInInfoSchema>

export type SignInError =
  | AuthUserError
  | 'INVALID_CREDENTIALS'

export type SignUpInfo = z.infer<typeof SignUpInfoSchema>

export type SignUpError =
  | AuthUserError
  | 'EMAIL_ALREADY_EXISTS'

export type AuthUser = {
  email: string
  name: string
  role: Role
}

export type SocialProvider = z.infer<typeof SocialProviderSchema>

export type SignInResult = ControllerResultWithValidationIssues<SignInError, AuthUser>
export type SignUpResult = ControllerResultWithValidationIssues<SignUpError, AuthUser>
