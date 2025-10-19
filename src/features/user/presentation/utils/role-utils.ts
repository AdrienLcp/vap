import type { UserRole } from '@/features/user/domain/user-entities'
import { t } from '@/infrastructure/i18n'

export const translateUserRole = (role: UserRole) => {
  switch (role) {
    case 'ADMIN':
      return t('user.roles.admin')
    case 'SUPER_ADMIN':
      return t('user.roles.superAdmin')
    case 'USER':
      return t('user.roles.customer')
    default:
      return role
  }
}
