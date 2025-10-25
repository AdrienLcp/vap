'use client'

import { useCallback, useState } from 'react'

import type { UserDTO } from '@/features/user/domain/user-entities'
import { UserClient } from '@/features/user/infrastructure/user-client'
import { UserListSearch } from '@/features/user/presentation/components/user-list-search'
import { UsersTable } from '@/features/user/presentation/components/users-table'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Loader } from '@/presentation/components/ui/loaders/loader'
import { ToastService } from '@/presentation/services/toast-service'

import './user-list.sass'

type UserListProps = {
  users: UserDTO[]
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  const [filteredUsers, setFilteredUsers] = useState<UserDTO[]>(users)
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false)

  const loadUsersByEmail = useCallback(async (email: string) => {
    setIsLoadingUsers(true)
    const usersResponse = await UserClient.findUsers(email)
    setIsLoadingUsers(false)

    if (usersResponse.status !== OK_STATUS) {
      ToastService.error(t('user.list.search.error'))
      return
    }

    setFilteredUsers(usersResponse.data)
  }, [])

  return (
    <div className='user-list'>
      <UserListSearch onChange={loadUsersByEmail} />

      {isLoadingUsers
        ? <Loader />
        : <UsersTable users={filteredUsers} />
      }
    </div>
  )
}
