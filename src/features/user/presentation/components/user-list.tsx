'use client'

import { getAdminUserRoute } from '@/domain/navigation'
import type { UserDTO } from '@/features/user/domain/user-entities'
import { t } from '@/infrastructure/i18n'
import { Table, type TableColumn, type TableRow } from '@/presentation/components/ui/table'

import './user-list.sass'

type UserListProps = {
  users: UserDTO[]
}

type TableColumnKey = 'name' | 'email' | 'role' | 'actions'
type UserTableColumn = TableColumn<TableColumnKey>

const userTableColumns: UserTableColumn[] = [
  { id: 'name', children: 'Name' },
  { id: 'email', children: 'Email', isRowHeader: true },
  { id: 'role', children: 'Role' },
  { id: 'actions' }
]

const renderUserTableCell = (user: UserDTO, column: UserTableColumn) => {
  switch (column.id) {
    case 'name':
      return user.name
    case 'email':
      return user.email
    case 'role':
      return user.role
    case 'actions':
      return null
    default:
      return null
  }
}

const renderUserTableEmptyState = () => (
  <p className='user-list empty-message'>{t('user.list.empty')}</p>
)

export const UserList: React.FC<UserListProps> = ({ users }) => {
  const userTableRows: TableRow<UserDTO>[] = users.map(user => ({
    href: getAdminUserRoute(user.id),
    id: user.id,
    item: user
  }))

  return (
    <Table
      aria-label={t('user.list.ariaLabel')}
      className='user-list'
      columns={userTableColumns}
      renderCell={renderUserTableCell}
      renderEmptyState={renderUserTableEmptyState}
      rows={userTableRows}
    />
  )
}
