import { z } from 'zod'

import { AUTH_CONSTANTS } from '@/features/auth/domain/auth-constants'

export const UserEmailSchema = z.email(AUTH_CONSTANTS.INVALID_EMAIL)
export const UserNameSchema = z.string().min(1, AUTH_CONSTANTS.USER_NAME_REQUIRED)
export const UserPasswordSchema = z.string().min(AUTH_CONSTANTS.PASSWORD_MIN_LENGTH, AUTH_CONSTANTS.PASSWORD_TOO_SHORT)

export const AuthPermissionsSchema = z.object({
  canAccessAdmin: z.boolean(),

  canCreateCategory: z.boolean(),
  canUpdateCategory: z.boolean(),
  canDeleteCategory: z.boolean(),

  canCreateProduct: z.boolean(),
  canReadProduct: z.boolean(),
  canUpdateProduct: z.boolean(),
  canDeleteProduct: z.boolean(),

  canReadUser: z.boolean(),
  canUpdateUser: z.boolean()
})

export const AuthUserDTOSchema = z.object({
  email: UserEmailSchema,
  image: z.string().nullish(),
  name: UserNameSchema,
  permissions: AuthPermissionsSchema
})
