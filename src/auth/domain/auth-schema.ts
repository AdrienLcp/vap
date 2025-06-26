import { z } from 'zod'

export const INVALID_EMAIL = 'INVALID_EMAIL'
export const USER_NAME_REQUIRED = 'NAME_REQUIRED'
export const PASSWORD_TOO_SHORT = 'PASSWORD_TOO_SHORT'

export const userEmailSchema = z.string().email(INVALID_EMAIL)

export const SignInInfoSchema = z.object({
  email: userEmailSchema,
  password: z.string()
})

export const SignUpInfoSchema = z.object({
  email: userEmailSchema,
  name: z.string().min(1, USER_NAME_REQUIRED),
  password: z.string().min(6, PASSWORD_TOO_SHORT)
})
