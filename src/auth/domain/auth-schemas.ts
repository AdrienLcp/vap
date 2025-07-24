import { z } from 'zod'

import { AUTH_CONSTANTS } from '@/auth/domain/auth-constants'

export const UserEmailSchema = z.email(AUTH_CONSTANTS.INVALID_EMAIL)
export const UserNameSchema = z.string().min(1, AUTH_CONSTANTS.USER_NAME_REQUIRED)
export const UserPasswordSchema = z.string().min(AUTH_CONSTANTS.PASSWORD_MIN_LENGTH, AUTH_CONSTANTS.PASSWORD_TOO_SHORT)
export const UserRoleSchema = z.enum(AUTH_CONSTANTS.USER_ROLES).catch(AUTH_CONSTANTS.DEFAULT_USER_ROLE)

export const AuthUserDTOSchema = z.object({
  name: UserNameSchema
})

export const AuthUserSchema = AuthUserDTOSchema.extend({
  role: UserRoleSchema
})

export const SignInRequestSchema = z.object({
  email: UserEmailSchema,
  password: z.string()
})

export const SignUpRequestSchema = SignInRequestSchema.extend({
  name: UserNameSchema,
  password: UserPasswordSchema
})
