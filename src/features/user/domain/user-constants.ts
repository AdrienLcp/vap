import type { Role } from '@prisma/client'

export const USER_CONSTANTS = {
  DEFAULT_ROLE: 'USER' satisfies Role,
  ROLES: ['USER', 'ADMIN', 'SUPER_ADMIN'] satisfies Role[]
} as const
