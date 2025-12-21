import type { AuthPermissions } from '@/features/auth/domain/auth-entities'
import type { UserRole } from '@/features/user/domain/user-entities'
import type { ValueOf } from '@/helpers/object'

const RIGHTS = {
  ADMIN_READ: 'admin:read',

  CATEGORY_CREATE: 'category:create',
  CATEGORY_DELETE: 'category:delete',
  CATEGORY_UPDATE: 'category:update',

  PRODUCT_CREATE: 'product:create',
  PRODUCT_DELETE: 'product:delete',
  PRODUCT_READ: 'product:read',
  PRODUCT_UPDATE: 'product:update',

  USER_READ: 'user:read',
  USER_UPDATE: 'user:update'
} as const

type Right = ValueOf<typeof RIGHTS>

const USER_RIGHTS: Readonly<Right[]> = []

const ADMIN_RIGHTS: Readonly<Right[]> = [
  ...USER_RIGHTS,

  RIGHTS.ADMIN_READ,

  RIGHTS.CATEGORY_CREATE,
  RIGHTS.CATEGORY_UPDATE,
  RIGHTS.CATEGORY_DELETE,

  RIGHTS.PRODUCT_CREATE,
  RIGHTS.PRODUCT_READ,
  RIGHTS.PRODUCT_UPDATE,
  RIGHTS.PRODUCT_DELETE,

  RIGHTS.USER_READ,
  RIGHTS.USER_UPDATE
]

const SUPER_ADMIN_RIGHTS: Readonly<Right[]> = [...ADMIN_RIGHTS]

const ROLE_RIGHTS: Record<UserRole, Readonly<Right[]>> = {
  ADMIN: ADMIN_RIGHTS,
  SUPER_ADMIN: SUPER_ADMIN_RIGHTS,
  USER: USER_RIGHTS
}

type Action = 'access' | 'create' | 'delete' | 'read' | 'update'
type Entity = 'admin' | 'category' | 'product' | 'user'

const ACTION_ENTITY_TO_RIGHT: Readonly<Record<string, Right>> = {
  'admin:access': RIGHTS.ADMIN_READ,

  'category:create': RIGHTS.CATEGORY_CREATE,
  'category:delete': RIGHTS.CATEGORY_DELETE,
  'category:update': RIGHTS.CATEGORY_UPDATE,

  'product:create': RIGHTS.PRODUCT_CREATE,
  'product:delete': RIGHTS.PRODUCT_DELETE,
  'product:read': RIGHTS.PRODUCT_READ,
  'product:update': RIGHTS.PRODUCT_UPDATE,

  'user:read': RIGHTS.USER_READ,
  'user:update': RIGHTS.USER_UPDATE
}

type UserWithRole = { role: UserRole }

export const can = (user: UserWithRole, action: Action, entity: Entity): boolean => {
  const key = `${entity}:${action}`
  const right = ACTION_ENTITY_TO_RIGHT[key] ?? null
  if (right == null) return false
  const rights = ROLE_RIGHTS[user.role] ?? USER_RIGHTS
  return rights.includes(right)
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
