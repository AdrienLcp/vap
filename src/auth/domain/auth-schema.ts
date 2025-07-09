import { z } from 'zod'

import { AUTH_CONSTANTS } from '@/auth/domain/auth-constants'

export const UserEmailSchema = z.string().email(AUTH_CONSTANTS.INVALID_EMAIL)
export const UserNameSchema = z.string().min(1, AUTH_CONSTANTS.USER_NAME_REQUIRED)

export const SignInRequestSchema = z.object({
  email: UserEmailSchema,
  password: z.string()
})

export const SignUpRequestSchema = SignInRequestSchema.extend({
  name: UserNameSchema,
  password: z.string().min(AUTH_CONSTANTS.PASSWORD_MIN_LENGTH, AUTH_CONSTANTS.PASSWORD_TOO_SHORT)
})

export const SocialProviderSchema = z.enum(AUTH_CONSTANTS.SOCIAL_PROVIDERS, {
  message: AUTH_CONSTANTS.INVALID_SOCIAL_PROVIDER
})

export const SocialProviderRequestSchema = z.object({
  provider: SocialProviderSchema
})

export const AuthUserDTOSchema = z.object({
  name: UserNameSchema
})
