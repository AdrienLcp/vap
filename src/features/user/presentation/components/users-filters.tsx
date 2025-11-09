import { useCallback } from 'react'

import type { UserFilters, UserRole } from '@/features/user/domain/user-entities'
import { UserRoleSelect } from '@/features/user/presentation/components/user-role-select'
import { UserSearch } from '@/features/user/presentation/components/user-search'

type UsersFiltersProps = {
  filters: UserFilters
  isLoadingUsers: boolean
  onFilterChange: (filters: UserFilters) => void
}

export const UsersFilters: React.FC<UsersFiltersProps> = ({
  filters,
  isLoadingUsers,
  onFilterChange
}) => {
  const onUserSearchChange = useCallback(
    (email: string) => {
      onFilterChange({ email })
    },
    [onFilterChange]
  )

  const onUserRolesFilterChange = useCallback(
    (roles: UserRole[]) => {
      onFilterChange({ roles })
    },
    [onFilterChange]
  )

  return (
    <>
      <UserSearch
        isDisabled={isLoadingUsers}
        onChange={onUserSearchChange}
        value={filters.email ?? ''}
      />

      <UserRoleSelect
        isDisabled={isLoadingUsers}
        onChange={onUserRolesFilterChange}
        selectedRoles={filters.roles ?? []}
      />
    </>
  )
}
