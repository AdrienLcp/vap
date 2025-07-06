import { z } from 'zod'

import { AUTH_CONSTANTS } from './auth-constants'

export const userEmailSchema = z.string().email(AUTH_CONSTANTS.INVALID_EMAIL)

export const SignInInfoSchema = z.object({
  email: userEmailSchema,
  password: z.string()
})

export const SignUpInfoSchema = z.object({
  email: userEmailSchema,
  name: z.string().min(1, AUTH_CONSTANTS.USER_NAME_REQUIRED),
  password: z.string().min(AUTH_CONSTANTS.PASSWORD_MIN_LENGTH, AUTH_CONSTANTS.PASSWORD_TOO_SHORT)
})

export const SocialProviderSchema = z.enum(AUTH_CONSTANTS.SOCIAL_PROVIDERS, {
  message: AUTH_CONSTANTS.INVALID_SOCIAL_PROVIDER
})
