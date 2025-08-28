import type { AuthPermissions } from '@/auth/domain/auth-entities'
import type { UserRole } from '@/user/domain/user-entities'

const USER_RIGHTS = [] as const

const ADMIN_RIGHTS = [
  ...USER_RIGHTS,

  'admin:read',

  'category:create',
  'category:update',
  'category:delete',

  'product:create',
  'product:read',
  'product:update',
  'product:delete'
] as const

const SUPER_ADMIN_RIGHTS = [...ADMIN_RIGHTS] as const

type Right = (typeof SUPER_ADMIN_RIGHTS)[number]

const ROLE_RIGHTS: Record<UserRole, Readonly<Right[]>> = {
  USER: USER_RIGHTS,
  ADMIN: ADMIN_RIGHTS,
  SUPER_ADMIN: SUPER_ADMIN_RIGHTS
}

export const getAuthUserPermissionsByRole = (role: UserRole): AuthPermissions => {
  const rights = ROLE_RIGHTS[role] ?? ROLE_RIGHTS.USER

  const permissions: AuthPermissions = {
    canAccessAdmin: rights.includes('admin:read'),

    canCreateCategory: rights.includes('category:create'),
    canUpdateCategory: rights.includes('category:update'),
    canDeleteCategory: rights.includes('category:delete'),

    canCreateProduct: rights.includes('product:create'),
    canReadProduct: rights.includes('product:read'),
    canUpdateProduct: rights.includes('product:update'),
    canDeleteProduct: rights.includes('product:delete')
  }

  return permissions
}
