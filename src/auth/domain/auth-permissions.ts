import type { AuthPermissions } from '@/auth/domain/auth-entities'
import type { UserRole } from '@/user/user-entities'

export const ROLE_PERMISSIONS: Record<UserRole, AuthPermissions> = {
  USER: {
    canAccessAdmin: false
  },
  ADMIN: {
    canAccessAdmin: true
  },
  SUPER_ADMIN: {
    canAccessAdmin: true
  }
}
