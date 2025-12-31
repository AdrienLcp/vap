'use client'

import { PackageCheckIcon } from 'lucide-react'

import { ROUTES } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { Link } from '@/presentation/components/ui/pressables/link'

export const CartOrderLink: React.FC = () => (
  <Link
    href={ROUTES.ordering}
    Icon={<PackageCheckIcon aria-hidden />}
    variant='filled'
  >
    {t('cart.pay')}
  </Link>
)
