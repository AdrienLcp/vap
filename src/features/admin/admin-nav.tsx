'use client'

import { BoxIcon, ListIcon, ShieldIcon } from 'lucide-react'

import { ROUTES } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { Link } from '@/presentation/components/ui/pressables/link'
import { Separator } from '@/presentation/components/ui/separator'

import './admin-nav.sass'

export const AdminNav: React.FC = () => (
  <nav className='admin-nav'>
    <Link
      href={ROUTES.admin}
      Icon={<ShieldIcon aria-hidden />}
      variant='underlined'
    >
      {t('admin.nav.admin')}
    </Link>

    <Separator orientation='vertical' />

    <Link
      href={ROUTES.adminProducts}
      Icon={<BoxIcon aria-hidden />}
      variant='underlined'
    >
      {t('admin.nav.products')}
    </Link>

    <Separator orientation='vertical' />

    <Link
      href={ROUTES.adminCategories}
      Icon={<ListIcon aria-hidden />}
      variant='underlined'
    >
      {t('admin.nav.categories')}
    </Link>
  </nav>
)
