'use client'

import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'

import { useCartStore } from '@/features/cart/application/use-cart-store'
import { CartClient } from '@/features/cart/infrastructure/cart-client'
import { NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Button } from '@/presentation/components/ui/pressables/button'
import { ToastService } from '@/presentation/services/toast-service'

export const CartClearButton: React.FC = () => {
  const [isClearingCart, setIsClearingCart] = useState(false)

  const clearStore = useCartStore(state => state.clearStore)

  const clearUserCart = async () => {
    setIsClearingCart(true)
    const cartClearResponse = await CartClient.clearUserCart()
    setIsClearingCart(false)

    if (cartClearResponse.status !== NO_CONTENT_STATUS) {
      ToastService.error(t('cart.clear.error'))
      return
    }

    clearStore()
  }

  return (
    <Button
      Icon={<Trash2Icon aria-hidden />}
      isPending={isClearingCart}
      onPress={clearUserCart}
      variant='outlined'
    >
      {t('cart.clear.label')}
    </Button>
  )
}
