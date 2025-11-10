'use client'

import { Trash2Icon } from 'lucide-react'
import { useCallback } from 'react'

import { useAuth } from '@/features/auth/application/use-auth'
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

export const CartItemDeleteButton: React.FC<CartItemDeleteButtonProps> = ({
  isLoading,
  productId,
  setIsLoading
}) => {
  const { auth } = useAuth()

  const removeCartItem = useCartStore((state) => state.removeItem)

  const removeRemoteCartItem = useCallback(async () => {
    setIsLoading(true)
    const cartItemDeletionResponse = await CartClient.removeItemFromUserCart(productId)
    setIsLoading(false)

    if (cartItemDeletionResponse.status !== NO_CONTENT_STATUS) {
      ToastService.error(t('cart.item.deleteError'))
      return
    }

    removeCartItem(productId)
  }, [productId, removeCartItem, setIsLoading])

  const onCartItemDeleteButtonPress = useCallback(async () => {
    if (auth.status === 'authenticated') {
      await removeRemoteCartItem()
      return
    }

    removeCartItem(productId)
  }, [auth.status, removeRemoteCartItem, removeCartItem, productId])

  const isButtonDisabled = auth.status === 'loading' || isLoading

  return (
    <Button
      className='cart-item-delete-button'
      isDisabled={isButtonDisabled}
      onPress={onCartItemDeleteButtonPress}
    >
      <Trash2Icon aria-hidden />
    </Button>
  )
}
