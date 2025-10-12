'use client'

import { ShoppingBasketIcon } from 'lucide-react'
import { useState } from 'react'

import { useCartStore } from '@/features/cart/application/use-cart-store'
import type { CartItemCreationData } from '@/features/cart/domain/cart-entities'
import { CartClient } from '@/features/cart/infrastructure/cart-client'
import { CREATED_STATUS } from '@/infrastructure/api/http-response'
import { Spinner } from '@/presentation/components/ui/loaders/spinner'
import { Button } from '@/presentation/components/ui/pressables/button'
import { ToastService } from '@/presentation/services/toast-service'

import './add-product-to-cart-button.sass'

type AddProductToCartButtonProps = {
  productId: string
}

const CART_ITEM_CREATION_INITIAL_QUANTITY = 1

export const AddProductToCartButton: React.FC<AddProductToCartButtonProps> = ({ productId }) => {
  const [isAddingProductToCart, setIsAddingProductToCart] = useState(false)

  const addProductToCartStore = useCartStore(state => state.addItem)

  const addProductToCart = async () => {
    setIsAddingProductToCart(true)

    const cartItemCreationData: CartItemCreationData = {
      productId,
      quantity: CART_ITEM_CREATION_INITIAL_QUANTITY
    }

    const createdItemResponse = await CartClient.addItemToUserCart(cartItemCreationData)

    setIsAddingProductToCart(false)

    if (createdItemResponse.status !== CREATED_STATUS) {
      ToastService.error('Could not add product to cart. Please try again.')
      return
    }

    addProductToCartStore(createdItemResponse.data.product, CART_ITEM_CREATION_INITIAL_QUANTITY)
  }

  return (
    <Button
      className='add-product-to-cart-button'
      isPending={isAddingProductToCart}
      onPress={addProductToCart}
    >
      {isAddingProductToCart ? <Spinner /> : <ShoppingBasketIcon />}
    </Button>
  )
}
