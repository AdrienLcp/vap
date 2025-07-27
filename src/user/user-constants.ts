import type { Role } from '@prisma/client'

export const USER_CONSTANTS = {
  ROLES: ['USER', 'ADMIN', 'SUPER_ADMIN'] satisfies Role[],
  DEFAULT_ROLE: 'USER' satisfies Role
} as const
