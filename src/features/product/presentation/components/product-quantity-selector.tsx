'use client'

import { useState } from 'react'

import { useCartStore } from '@/features/cart/application/use-cart-store'
import { CART_CONSTANTS } from '@/features/cart/domain/cart-constants'
import { CartClient } from '@/features/cart/infrastructure/cart-client'
import { NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { QuantitySelector } from '@/presentation/components/ui/quantity-selector'
import { ToastService } from '@/presentation/services/toast-service'

type ProductQuantitySelectorProps = {
  productId: string
}

export const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({ productId }) => {
  const cartProductQuantity = useCartStore(state => state.getProductQuantity(productId))
  const updateProductCartStoreQuantity = useCartStore(state => state.updateQuantity)

  const [isUpdatingCartProduct, setIsAddingProductToCart] = useState(false)

  const updateProductCartQuantity = async (newQuantity: number) => {
    setIsAddingProductToCart(true)

    const updatedItemResponse = await CartClient.updateUserCartItemQuantity(productId, newQuantity)

    setIsAddingProductToCart(false)

    if (updatedItemResponse.status !== NO_CONTENT_STATUS) {
      ToastService.error('Could not update product quantity. Please try again.')
      return
    }

    updateProductCartStoreQuantity(productId, newQuantity)
  }

  return (
    <QuantitySelector
      isDisabled={isUpdatingCartProduct}
      max={CART_CONSTANTS.MAX_ITEM_QUANTITY}
      onQuantityChange={updateProductCartQuantity}
      quantity={cartProductQuantity}
    />
  )
}
