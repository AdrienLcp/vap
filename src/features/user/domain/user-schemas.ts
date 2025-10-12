import { z } from 'zod'

import { USER_CONSTANTS } from '@/features/user/domain/user-constants'

export const UserIdSchema = z.string()

export const UserRoleSchema = z.enum(USER_CONSTANTS.ROLES)

export const UserUpdateSchema = z.object({
  role: UserRoleSchema
})

export const UserDTOSchema = z.object({
  id: UserIdSchema,
  name: z.string(),
  email: z.email(),
  role: UserRoleSchema.catch(USER_CONSTANTS.DEFAULT_ROLE)
})
