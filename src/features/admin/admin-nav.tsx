'use client'

import { ShieldIcon } from 'lucide-react'

import { ROUTES } from '@/domain/navigation'
import { adminNavItems } from '@/features/admin/admin-nav-items'
import { t } from '@/infrastructure/i18n'
import { Link } from '@/presentation/components/ui/pressables/link'

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

    {adminNavItems.map(({ href, Icon, id, textValue }) => (
      <Link href={href} Icon={Icon} key={id} variant='underlined'>
        {textValue}
      </Link>
    ))}
  </nav>
)
