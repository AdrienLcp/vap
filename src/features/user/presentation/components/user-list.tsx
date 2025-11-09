'use client'

import { parseAsArrayOf, parseAsStringLiteral, useQueryState } from 'nuqs'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { USER_CONSTANTS, USER_SEARCH_PARAMS } from '@/features/user/domain/user-constants'
import type { UserDTO, UserFilters, UserRole } from '@/features/user/domain/user-entities'
import { UserClient } from '@/features/user/infrastructure/user-client'
import { UsersFilters } from '@/features/user/presentation/components/users-filters'
import { UsersTable } from '@/features/user/presentation/components/users-table'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Loader } from '@/presentation/components/ui/loaders/loader'
import { ToastService } from '@/presentation/services/toast-service'

import './user-list.sass'

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserDTO[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false)

  const [userEmailFilter, setUserEmailFilter] = useQueryState(USER_SEARCH_PARAMS.EMAIL, {
    defaultValue: ''
  })

  const [userRolesFilter, setUserRolesFilter] = useQueryState(
    USER_SEARCH_PARAMS.ROLES,
    parseAsArrayOf<UserRole>(parseAsStringLiteral(USER_CONSTANTS.ROLES))
  )

  const loadUsers = useCallback(async (filters?: UserFilters) => {
    setIsLoadingUsers(true)
    const usersResponse = await UserClient.findUsers(filters)
    setIsLoadingUsers(false)

    if (usersResponse.status !== OK_STATUS) {
      ToastService.error(t('user.list.search.error'))
      return
    }

    setUsers(usersResponse.data)
  }, [])

  useEffect(() => {
    loadUsers({ email: userEmailFilter, roles: userRolesFilter ?? undefined })
  }, [loadUsers, userEmailFilter, userRolesFilter])

  const userFilters: UserFilters = useMemo(
    () => ({
      email: userEmailFilter,
      roles: userRolesFilter ?? undefined
    }),
    [userEmailFilter, userRolesFilter]
  )

  const onFilterChange = useCallback(
    (filters: UserFilters) => {
      if (filters.email != null) {
        setUserEmailFilter(filters.email)
      }

      if (filters.roles != null) {
        setUserRolesFilter(filters.roles.length > 0 ? filters.roles : null)
      }
    },
    [setUserEmailFilter, setUserRolesFilter]
  )

  return (
    <div className='user-list'>
      <UsersFilters
        filters={userFilters}
        isLoadingUsers={isLoadingUsers}
        onFilterChange={onFilterChange}
      />

      {isLoadingUsers ? <Loader /> : <UsersTable users={users} />}
    </div>
  )
}
