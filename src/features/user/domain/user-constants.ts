import type { Role } from '@prisma/client'

export const USER_CONSTANTS = {
  DEFAULT_ROLE: 'USER' satisfies Role,
  ROLES: ['USER', 'ADMIN', 'SUPER_ADMIN'] satisfies Role[]
} as const

export const USER_API_BASE_URL = 'users'

export const USER_SEARCH_PARAMS = {
  EMAIL: 'email',
  ROLES: 'roles',
  ROLES_SEPARATOR: ','
} as const
