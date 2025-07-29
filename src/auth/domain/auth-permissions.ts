import type { AuthPermissions } from '@/auth/domain/auth-entities'
import type { UserRole } from '@/user/user-entities'

export const ROLE_PERMISSIONS: Record<UserRole, AuthPermissions> = {
  USER: {
    canAccessAdmin: false,

    canUpdateCategory: false
  },
  ADMIN: {
    canAccessAdmin: true,

    canUpdateCategory: true
  },
  SUPER_ADMIN: {
    canAccessAdmin: true,

    canUpdateCategory: true
  }
}
