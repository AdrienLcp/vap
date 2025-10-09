'use client'

import { Trash2Icon } from 'lucide-react'
import { useCallback } from 'react'

import { useCartStore } from '@/features/cart/application/use-cart-store'
import { CartClient } from '@/features/cart/infrastructure/cart-client'
import { NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Button } from '@/presentation/components/ui/pressables/button'
import { ToastService } from '@/presentation/services/toast-service'

import './cart-item-delete-button.sass'

type CartItemDeleteButtonProps = {
  isLoading: boolean
  productId: string
  setIsLoading: (isLoading: boolean) => void
}

export const CartItemDeleteButton: React.FC<CartItemDeleteButtonProps> = ({ isLoading, productId, setIsLoading }) => {
  const removeCartItem = useCartStore(state => state.removeItem)

  const onCartItemDeleteButtonPress = useCallback(async () => {
    setIsLoading(true)
    const cartItemDeletionResponse = await CartClient.removeItemFromUserCart(productId)
    setIsLoading(false)

    if (cartItemDeletionResponse.status === NO_CONTENT_STATUS) {
      removeCartItem(productId)
      return
    }

    ToastService.error(t('cart.item.deleteError'))
  }, [productId, removeCartItem, setIsLoading])

  return (
    <Button
      className='cart-item-delete-button'
      isDisabled={isLoading}
      onPress={onCartItemDeleteButtonPress}
    >
      <Trash2Icon />
    </Button>
  )
}
