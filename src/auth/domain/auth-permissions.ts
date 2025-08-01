import type { AuthPermissions } from '@/auth/domain/auth-entities'
import type { UserRole } from '@/user/user-entities'

export const ROLE_PERMISSIONS: Record<UserRole, AuthPermissions> = {
  USER: {
    canAccessAdmin: false,

    canReadProduct: false,
    canCreateProduct: false,
    canUpdateProduct: false,

    canCreateCategory: false,
    canUpdateCategory: false
  },
  ADMIN: {
    canAccessAdmin: true,

    canReadProduct: true,
    canCreateProduct: true,
    canUpdateProduct: true,

    canCreateCategory: true,
    canUpdateCategory: true
  },
  SUPER_ADMIN: {
    canAccessAdmin: true,

    canReadProduct: true,
    canCreateProduct: true,
    canUpdateProduct: true,

    canCreateCategory: true,
    canUpdateCategory: true
  }
}
