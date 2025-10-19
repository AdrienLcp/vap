'use client'

import { getAdminUserRoute } from '@/domain/navigation'
import type { UserDTO } from '@/features/user/domain/user-entities'
import { translateUserRole } from '@/features/user/presentation/utils/role-utils'
import { t } from '@/infrastructure/i18n'
import { Table, type TableColumn, type TableRow } from '@/presentation/components/ui/table'

import './users-table.sass'

type UsersTableProps = {
  users: UserDTO[]
}

type TableColumnKey = 'email' | 'name' | 'role'
type UserTableColumn = TableColumn<TableColumnKey>

const userTableColumns: UserTableColumn[] = [
  { id: 'name', children: t('user.list.table.columns.name') },
  { id: 'email', children: t('user.list.table.columns.email'), isRowHeader: true },
  { id: 'role', children: t('user.list.table.columns.role') }
]

const renderUserTableCell = (user: UserDTO, column: UserTableColumn) => {
  switch (column.id) {
    case 'email':
      return user.email
    case 'name':
      return user.name
    case 'role':
      return translateUserRole(user.role)
    default:
      return null
  }
}

const renderUserTableEmptyState = () => (
  <p className='users-table empty-message'>{t('user.list.table.empty')}</p>
)

export const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const userTableRows: TableRow<UserDTO>[] = users.map(user => ({
    href: getAdminUserRoute(user.id),
    id: user.id,
    item: user
  }))

  return (
    <Table
      aria-label={t('user.list.table.ariaLabel')}
      className='users-table'
      columns={userTableColumns}
      renderCell={renderUserTableCell}
      renderEmptyState={renderUserTableEmptyState}
      rows={userTableRows}
    />
  )
}
