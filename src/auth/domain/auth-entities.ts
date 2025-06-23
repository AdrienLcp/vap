import { z } from 'zod'

import { SignInRequestBodySchema, SignUpRequestBodySchema } from '@/auth/domain/auth-schema'
import { NotFound, UnexpectedError } from '@/helpers/result'

export type AuthUserError = NotFound | UnexpectedError

export type SignInInfo = z.infer<typeof SignInRequestBodySchema>

export type SignInError =
  | AuthUserError
  | 'INVALID_CREDENTIALS'

export type SignUpInfo = z.infer<typeof SignUpRequestBodySchema>

export type SignUpError =
  | AuthUserError
  | 'EMAIL_ALREADY_EXISTS'
  | 'INVALID_EMAIL'
  | 'WEAK_PASSWORD'

export type AuthUser = {
  email: string
  name: string
}
