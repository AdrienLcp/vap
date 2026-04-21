'use client'

import { PackageCheckIcon } from 'lucide-react'
import { useMemo, useState } from 'react'

import { ROUTES } from '@/domain/navigation'
import { AddressSelector } from '@/features/address/presentation/components/address-selector'
import { useCartStore } from '@/features/cart/application/use-cart-store'
import { calculateShippingCost } from '@/features/order/domain/order-shipping'
import { CheckoutClient } from '@/features/payment/infrastructure/checkout-client'
import { CheckoutItemList } from '@/features/payment/presentation/components/checkout-item-list'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Button } from '@/presentation/components/ui/pressables/button'
import { Link } from '@/presentation/components/ui/pressables/link'

import './checkout-review-page.sass'

export const CheckoutReviewPage: React.FC = () => {
  const items = useCartStore((state) => state.items)
  const cartItems = useMemo(() => Array.from(items.values()), [items])
  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          (item.product.discountedPrice ?? item.product.price) * item.quantity,
        0
      ),
    [cartItems]
  )
  const shippingCost = useMemo(
    () => calculateShippingCost(subtotal),
    [subtotal]
  )

  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePay = async () => {
    if (!selectedAddressId) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    const response = await CheckoutClient.createCheckoutSession({
      shippingAddressId: selectedAddressId
    })

    if (response.status !== OK_STATUS) {
      setError(t('checkout.error'))
      setIsSubmitting(false)
      return
    }

    window.location.href = response.data.url
  }

  if (cartItems.length === 0) {
    return (
      <main className='checkout-review-page'>
        <h1>{t('checkout.title')}</h1>
        <p>{t('checkout.emptyCart')}</p>
        <Link href={ROUTES.home} variant='underlined'>
          {t('checkout.success.backHome')}
        </Link>
      </main>
    )
  }

  return (
    <main className='checkout-review-page'>
      <h1>{t('checkout.title')}</h1>

      <CheckoutItemList
        cartItems={cartItems}
        shippingCost={shippingCost}
        subtotal={subtotal}
      />

      <section>
        <h2>{t('checkout.addressLabel')}</h2>
        <AddressSelector
          onAddressChange={setSelectedAddressId}
          selectedAddressId={selectedAddressId}
        />
      </section>

      {error && (
        <p className='error' role='alert'>
          {error}
        </p>
      )}

      <div className='actions'>
        <Button
          aria-label={t('checkout.payAriaLabel')}
          Icon={<PackageCheckIcon aria-hidden />}
          isDisabled={isSubmitting || !selectedAddressId}
          onPress={handlePay}
          variant='filled'
        >
          {t('checkout.pay')}
        </Button>
      </div>
    </main>
  )
}
