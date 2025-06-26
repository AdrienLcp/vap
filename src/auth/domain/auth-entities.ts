import { User } from 'better-auth'
import { z } from 'zod'

import { SignInInfoSchema, SignUpInfoSchema } from '@/auth/domain/auth-schema'
import { NotFound, UnexpectedError } from '@/helpers/result'

export type AuthInfo = {
  user: User
}

export type AuthUserError = NotFound | UnexpectedError

export type SignInInfo = z.infer<typeof SignInInfoSchema>

export type SignInError =
  | AuthUserError
  | 'INVALID_CREDENTIALS'

export type SignUpInfo = z.infer<typeof SignUpInfoSchema>

export type SignUpError =
  | AuthUserError
  | 'EMAIL_ALREADY_EXISTS'
  | 'INVALID_EMAIL'
  | 'WEAK_PASSWORD'

export type AuthUser = {
  email: string
  name: string
}
