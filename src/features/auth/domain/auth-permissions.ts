import type { AuthPermissions } from '@/features/auth/domain/auth-entities'
import type { UserRole } from '@/features/user/domain/user-entities'

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
  'product:delete',

  'user:read',
  'user:update'
] as const

const SUPER_ADMIN_RIGHTS = [...ADMIN_RIGHTS] as const

type Right = (typeof SUPER_ADMIN_RIGHTS)[number]

const ROLE_RIGHTS: Record<UserRole, Readonly<Right[]>> = {
  ADMIN: ADMIN_RIGHTS,
  SUPER_ADMIN: SUPER_ADMIN_RIGHTS,
  USER: USER_RIGHTS
}

export const getAuthUserPermissionsByRole = (role: UserRole): AuthPermissions => {
  const rights = ROLE_RIGHTS[role] ?? ROLE_RIGHTS.USER

  const permissions: AuthPermissions = {
    canAccessAdmin: rights.includes('admin:read'),

    canCreateCategory: rights.includes('category:create'),
    canCreateProduct: rights.includes('product:create'),

    canDeleteCategory: rights.includes('category:delete'),
    canDeleteProduct: rights.includes('product:delete'),

    canReadProduct: rights.includes('product:read'),
    canReadUser: rights.includes('user:read'),

    canUpdateCategory: rights.includes('category:update'),
    canUpdateProduct: rights.includes('product:update'),
    canUpdateUser: rights.includes('user:update')
  }

  return permissions
}
