'use client'

import { BoxIcon, ListIcon, ShieldIcon } from 'lucide-react'

import { ROUTES } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { Link } from '@/presentation/components/ui/pressables/link'
import { Separator } from '@/presentation/components/ui/separator'

import './admin-nav.sass'

type AdminNavLinkProps = {
  href: string
  Icon: React.ReactElement
  label: string
}

const AdminLink: React.FC<AdminNavLinkProps> = ({ href, Icon, label }) => (
  <Link
    href={href}
    Icon={Icon}
    variant='underlined'
  >
    {label}
  </Link>
)

export const AdminNav: React.FC = () => (
  <nav className='admin-nav'>
    <AdminLink
      href={ROUTES.admin}
      Icon={<ShieldIcon aria-hidden />}
      label={t('admin.nav.admin')}
    />

    <Separator orientation='vertical' />

    <AdminLink
      href={ROUTES.adminProducts}
      Icon={<BoxIcon aria-hidden />}
      label={t('admin.nav.products')}
    />

    <Separator orientation='vertical' />

    <AdminLink
      href={ROUTES.adminCategories}
      Icon={<ListIcon aria-hidden />}
      label={t('admin.nav.categories')}
    />
  </nav>
)
