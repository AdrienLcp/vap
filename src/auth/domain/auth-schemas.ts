import { z } from 'zod'

import { AUTH_CONSTANTS } from '@/auth/domain/auth-constants'
import { UserRoleSchema } from '@/user/user-schemas'

export const UserEmailSchema = z.email(AUTH_CONSTANTS.INVALID_EMAIL)
export const UserNameSchema = z.string().min(1, AUTH_CONSTANTS.USER_NAME_REQUIRED)
export const UserPasswordSchema = z.string().min(AUTH_CONSTANTS.PASSWORD_MIN_LENGTH, AUTH_CONSTANTS.PASSWORD_TOO_SHORT)

export const AuthPermissionsSchema = z.object({
  canAccessAdmin: z.boolean()
})

export const AuthUserSchema = z.object({
  name: UserNameSchema,
  role: UserRoleSchema
})

export const AuthUserDTOSchema = AuthUserSchema
  .omit({ role: true })
  .extend({ permissions: AuthPermissionsSchema })

export const SignInRequestSchema = z.object({
  email: UserEmailSchema,
  password: z.string()
})

export const SignUpRequestSchema = SignInRequestSchema
  .omit({ password: true })
  .extend({
    name: UserNameSchema,
    password: UserPasswordSchema
  })
