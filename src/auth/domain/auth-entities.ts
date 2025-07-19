import type { Role } from '@prisma/client'
import { z } from 'zod'

import type { ApiResponse, Unauthorized } from '@/api/api-domain'
import { AuthUserDTOSchema, SignInRequestSchema, SignUpRequestSchema } from '@/auth/domain/auth-schema'
import type { NotFound, UnexpectedError } from '@/helpers/result'
import { AUTH_CONSTANTS } from './auth-constants'

export type AuthUserError = NotFound | Unauthorized | UnexpectedError

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
  name: string
  role: Role
}

export type SocialProvider = typeof AUTH_CONSTANTS.SOCIAL_PROVIDERS[number]

export type AuthUserDTO = z.infer<typeof AuthUserDTOSchema>

export type AuthUserResponse = ApiResponse<Unauthorized, AuthUserDTO>
