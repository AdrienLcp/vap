import type { AuthPermissions } from '@/auth/domain/auth-entities'
import type { UserRole } from '@/user/user-entities'

export const ROLE_PERMISSIONS: Record<UserRole, AuthPermissions> = {
  USER: {
    canAccessAdmin: false,

    canCreateCategory: false,
    canUpdateCategory: false,

    canReadProduct: false,
    canCreateProduct: false,
    canUpdateProduct: false,
    canDeleteProduct: false
  },
  ADMIN: {
    canAccessAdmin: true,

    canCreateCategory: true,
    canUpdateCategory: true,

    canReadProduct: true,
    canCreateProduct: true,
    canUpdateProduct: true,
    canDeleteProduct: true
  },
  SUPER_ADMIN: {
    canAccessAdmin: true,

    canCreateCategory: true,
    canUpdateCategory: true,

    canReadProduct: true,
    canCreateProduct: true,
    canUpdateProduct: true,
    canDeleteProduct: true
  }
}
