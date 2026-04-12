'use client'

import { ROUTES } from '@/domain/navigation'
import type { OrderDTO } from '@/features/order/domain/order-entities'
import { formatPrice } from '@/infrastructure/format/price-formatter'
import { t } from '@/infrastructure/i18n'
import {
  Table,
  type TableColumn,
  type TableRow
} from '@/presentation/components/ui/table'

import './orders-table.sass'

type OrdersTableProps = {
  orders: OrderDTO[]
}

type ColumnKey = 'createdAt' | 'email' | 'id' | 'status' | 'totalPrice'
type OrderTableColumn = TableColumn<ColumnKey>

const orderTableColumns: OrderTableColumn[] = [
  { children: t('order.admin.orderId'), id: 'id' },
  { children: t('order.admin.customerEmail'), id: 'email', isRowHeader: true },
  { children: t('order.admin.totalPrice'), id: 'totalPrice' },
  { children: t('order.admin.statusLabel'), id: 'status' },
  { children: t('order.admin.date'), id: 'createdAt' }
]

const translateStatus = (status: string) =>
  t(`order.status.${status}` as 'order.status.PAID')

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(date))

const renderOrderTableCell = (order: OrderDTO, column: OrderTableColumn) => {
  switch (column.id) {
    case 'createdAt':
      return formatDate(order.createdAt)
    case 'email':
      return order.user.email
    case 'id':
      return `#${order.id.slice(-8)}`
    case 'status':
      return (
        <span className={`status-badge ${order.status.toLowerCase()}`}>
          {translateStatus(order.status)}
        </span>
      )
    case 'totalPrice':
      return formatPrice(order.totalPrice)
    default:
      return null
  }
}

const renderOrderTableEmptyState = () => (
  <p className='empty-message'>{t('order.admin.empty')}</p>
)

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  const orderTableRows: TableRow<OrderDTO>[] = orders.map((order) => ({
    href: `${ROUTES.adminOrders}/${order.id}`,
    id: order.id,
    item: order
  }))

  return (
    <Table
      aria-label={t('order.admin.tableAriaLabel')}
      className='orders-table'
      columns={orderTableColumns}
      renderCell={renderOrderTableCell}
      renderEmptyState={renderOrderTableEmptyState}
      rows={orderTableRows}
    />
  )
}
