import type { AuthPermissions } from '@/auth/domain/auth-entities'
import type { UserRole } from '@/user/user-entities'

type Feature =
  | 'admin'
  | 'category'
  | 'product'

type Action =
  | 'create'
  | 'delete'
  | 'read'
  | 'update'

type Right = `${Action}:${Feature}`

const USER_RIGHTS: Right[] = []

const ADMIN_RIGHTS: Right[] = [
  ...USER_RIGHTS,
  'read:admin',
  'create:category',
  'update:category',
  'delete:category',
  'read:product',
  'create:product',
  'update:product',
  'delete:product'
]

const SUPER_ADMIN_RIGHTS: Right[] = [...ADMIN_RIGHTS]

const ROLE_RIGHTS: Record<UserRole, Right[]> = {
  USER: USER_RIGHTS,
  ADMIN: ADMIN_RIGHTS,
  SUPER_ADMIN: SUPER_ADMIN_RIGHTS
}

export const getAuthUserPermissionsByRole = (role: UserRole): AuthPermissions => {
  const rights = ROLE_RIGHTS[role] ?? ROLE_RIGHTS.USER

  const permissions: AuthPermissions = {
    canAccessAdmin: rights.includes('read:admin'),

    canCreateCategory: rights.includes('create:category'),
    canUpdateCategory: rights.includes('update:category'),
    canDeleteCategory: rights.includes('delete:category'),

    canReadProduct: rights.includes('read:product'),
    canCreateProduct: rights.includes('create:product'),
    canUpdateProduct: rights.includes('update:product'),
    canDeleteProduct: rights.includes('delete:product')
  }

  return permissions
}
