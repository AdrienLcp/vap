'use client'

import { BoxIcon, CalendarArrowDownIcon, ListIcon, ShieldIcon, UsersRoundIcon } from 'lucide-react'

import { ROUTES } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { Link } from '@/presentation/components/ui/pressables/link'

import './admin-nav.sass'

type AdminNavItem = {
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

export const AdminNav: React.FC = () => (
  <nav className='admin-nav'>
    <Link href={ROUTES.admin} Icon={<ShieldIcon aria-hidden />} variant='underlined'>
      {t('admin.nav.admin')}
    </Link>

    {adminNavItems.map(({ href, Icon, id, textValue }) => (
      <Link href={href} Icon={Icon} key={id} variant='underlined'>
        {textValue}
      </Link>
    ))}
  </nav>
)
