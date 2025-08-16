import { z } from 'zod'

import { USER_CONSTANTS } from '@/user/domain/user-constants'

export const UserRoleSchema = z.enum(USER_CONSTANTS.ROLES)
