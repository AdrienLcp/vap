import {
  BoxIcon,
  CalendarArrowDownIcon,
  ListIcon,
  UsersRoundIcon
} from 'lucide-react'

import { ROUTES } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'

export type AdminNavItem = {
  href: string
  Icon: React.ReactElement
  id: string
  textValue: string
}

export const adminNavItems: AdminNavItem[] = [
  {
    href: ROUTES.adminProducts,
    Icon: <BoxIcon aria-hidden />,
    id: 'products',
    textValue: t('admin.nav.products')
  },
  {
    href: ROUTES.adminCategories,
    Icon: <ListIcon aria-hidden />,
    id: 'categories',
    textValue: t('admin.nav.categories')
  },
  {
    href: ROUTES.adminOrders,
    Icon: <CalendarArrowDownIcon aria-hidden />,
    id: 'orders',
    textValue: t('admin.nav.orders')
  },
  {
    href: ROUTES.adminUsers,
    Icon: <UsersRoundIcon aria-hidden />,
    id: 'users',
    textValue: t('admin.nav.users')
  }
]
