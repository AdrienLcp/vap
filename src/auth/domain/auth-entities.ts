import { z } from 'zod'

import { SignUpRequestBodySchema } from '@/auth/domain/auth-schema'
import { UnexpectedError } from '@/domain/entities'

export type SignUpInfo = z.infer<typeof SignUpRequestBodySchema>

export type SignUpError =
  | 'EMAIL_ALREADY_EXISTS'
  | 'INVALID_EMAIL'
  | 'WEAK_PASSWORD'
  | UnexpectedError

export type AuthUser = {
  email: string
  name: string
}
