'use client'

import { PackageCheckIcon } from 'lucide-react'

import { ROUTES } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { Link } from '@/presentation/components/ui/pressables/link'

export const CartOrderLink: React.FC = () => (
  <Link
    href={ROUTES.order}
    Icon={<PackageCheckIcon />}
    variant='filled'
  >
    {t('cart.pay')}
  </Link>
)
