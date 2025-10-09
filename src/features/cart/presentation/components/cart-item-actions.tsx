'use client'

import { useState } from 'react'

import { CartItemDeleteButton } from '@/features/cart/presentation/components/cart-item-delete-button'
import { ProductQuantitySelector } from '@/features/product/presentation/components/product-quantity-selector'

import './cart-item-actions.sass'

type CartItemActionsProps = {
  productId: string
}

export const CartItemActions: React.FC<CartItemActionsProps> = ({ productId }) => {
  const [isCartItemLoading, setIsCartItemLoading] = useState(false)

  return (
    <fieldset className='cart-item-actions' disabled={isCartItemLoading}>
      <ProductQuantitySelector productId={productId} setIsLoading={setIsCartItemLoading} />

      <CartItemDeleteButton
        isLoading={isCartItemLoading}
        productId={productId}
        setIsLoading={setIsCartItemLoading}
      />
    </fieldset>
  )
}
