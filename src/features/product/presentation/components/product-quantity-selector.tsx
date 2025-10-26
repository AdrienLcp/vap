'use client'

import { useCallback, useState } from 'react'

import { useCartStore } from '@/features/cart/application/use-cart-store'
import { CART_CONSTANTS } from '@/features/cart/domain/cart-constants'
import { CartClient } from '@/features/cart/infrastructure/cart-client'
import { NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { QuantitySelector } from '@/presentation/components/ui/quantity-selector'
import { ToastService } from '@/presentation/services/toast-service'

type ProductQuantitySelectorProps = {
  productId: string
  setIsLoading?: (isLoading: boolean) => void
}

export const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({
  productId,
  setIsLoading
}) => {
  const cartProductQuantity = useCartStore((state) => state.getProductQuantity(productId))
  const updateProductCartStoreQuantity = useCartStore((state) => state.updateQuantity)

  const [isUpdatingCartProduct, setIsUpdatingCartProduct] = useState(false)

  const setIsProductQuantitySelectorLoading = useCallback(
    (isLoading: boolean) => {
      setIsLoading?.(isLoading)
      setIsUpdatingCartProduct(isLoading)
    },
    [setIsLoading]
  )

  const updateProductCartQuantity = useCallback(
    async (newQuantity: number) => {
      setIsProductQuantitySelectorLoading(true)
      const cartProductUpdateResponse = await CartClient.updateUserCartItemQuantity(
        productId,
        newQuantity
      )
      setIsProductQuantitySelectorLoading(false)

      if (cartProductUpdateResponse.status === NO_CONTENT_STATUS) {
        updateProductCartStoreQuantity(productId, newQuantity)
        return
      }

      ToastService.error(t('product.quantitySelector.error'))
    },
    [productId, setIsProductQuantitySelectorLoading, updateProductCartStoreQuantity]
  )

  return (
    <QuantitySelector
      isDisabled={isUpdatingCartProduct}
      max={CART_CONSTANTS.MAX_ITEM_QUANTITY}
      onQuantityChange={updateProductCartQuantity}
      quantity={cartProductQuantity}
    />
  )
}
