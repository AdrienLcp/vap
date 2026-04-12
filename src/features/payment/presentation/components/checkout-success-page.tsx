'use client'

import { useEffect } from 'react'

import { ROUTES } from '@/domain/navigation'
import { useCartStore } from '@/features/cart/application/use-cart-store'
import { t } from '@/infrastructure/i18n'
import { Link } from '@/presentation/components/ui/pressables/link'

import './checkout-success-page.sass'

export const CheckoutSuccessPage: React.FC = () => {
  const clearStore = useCartStore((state) => state.clearStore)

  useEffect(() => {
    clearStore()
  }, [clearStore])

  return (
    <main className='checkout-success-page'>
      <h1>{t('checkout.success.title')}</h1>
      <p>{t('checkout.success.description')}</p>
      <Link href={ROUTES.home} variant='filled'>
        {t('checkout.success.backHome')}
      </Link>
    </main>
  )
}
