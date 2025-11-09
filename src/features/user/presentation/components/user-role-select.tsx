import { useCallback } from 'react'
import type { Key } from 'react-aria-components'

import { USER_CONSTANTS } from '@/features/user/domain/user-constants'
import type { UserRole } from '@/features/user/domain/user-entities'
import { t } from '@/infrastructure/i18n'
import { Select, type SelectItem } from '@/presentation/components/forms/select'

type UserRoleSelectProps = {
  isDisabled: boolean
  onChange: (roles: UserRole[]) => void
  selectedRoles: UserRole[]
}

const userRoleSelectItems: SelectItem<UserRole>[] = [
  { id: 'USER', textValue: t('user.roles.customer') },
  { id: 'ADMIN', textValue: t('user.roles.admin') },
  { id: 'SUPER_ADMIN', textValue: t('user.roles.superAdmin') }
]

export const UserRoleSelect: React.FC<UserRoleSelectProps> = ({
  isDisabled,
  onChange,
  selectedRoles
}) => {
  const onSelectRole = useCallback(
    (keys: Key[]) => {
      const selectedRoles: UserRole[] = []

      for (const roleKey of keys) {
        const role = roleKey as UserRole

        if (USER_CONSTANTS.ROLES.includes(role)) {
          selectedRoles.push(role)
        }
      }

      onChange(selectedRoles)
    },
    [onChange]
  )

  return (
    <Select
      isDisabled={isDisabled}
      items={userRoleSelectItems}
      label={t('user.list.roleFilter.label')}
      onChange={onSelectRole}
      placeholder={t('user.list.roleFilter.placeholder')}
      selectionMode='multiple'
      value={selectedRoles}
    />
  )
}
