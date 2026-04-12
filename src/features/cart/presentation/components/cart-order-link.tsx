'use client'

import { PackageCheckIcon } from 'lucide-react'
import { useContext } from 'react'
import { OverlayTriggerStateContext } from 'react-aria-components'

import { ROUTES } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { Link } from '@/presentation/components/ui/pressables/link'

export const CartOrderLink: React.FC = () => {
  const overlayState = useContext(OverlayTriggerStateContext)

  return (
    <Link
      href={ROUTES.checkout}
      Icon={<PackageCheckIcon aria-hidden />}
      onPress={() => overlayState?.close()}
      variant='filled'
    >
      {t('cart.pay')}
    </Link>
  )
}
