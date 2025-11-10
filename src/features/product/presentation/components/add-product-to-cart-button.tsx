'use client'

import { ShoppingBasketIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

import { useAuth } from '@/features/auth/application/use-auth'
import { useCartStore } from '@/features/cart/application/use-cart-store'
import type { CartItemCreationData } from '@/features/cart/domain/cart-entities'
import { CartClient } from '@/features/cart/infrastructure/cart-client'
import type { ProductPublicDTO } from '@/features/product/domain/product-entities'
import { CREATED_STATUS } from '@/infrastructure/api/http-response'
import { Spinner } from '@/presentation/components/ui/loaders/spinner'
import { Button } from '@/presentation/components/ui/pressables/button'
import { ToastService } from '@/presentation/services/toast-service'

import './add-product-to-cart-button.sass'

type AddProductToCartButtonProps = {
  product: ProductPublicDTO
}

const CART_ITEM_CREATION_INITIAL_QUANTITY = 1

export const AddProductToCartButton: React.FC<AddProductToCartButtonProps> = ({ product }) => {
  const { auth } = useAuth()

  const [isAddingProductToCart, setIsAddingProductToCart] = useState(false)

  const addProductToCartStore = useCartStore((state) => state.addItem)

  const addProductToRemoteCart = useCallback(async () => {
    setIsAddingProductToCart(true)

    const cartItemCreationData: CartItemCreationData = {
      productId: product.id,
      quantity: CART_ITEM_CREATION_INITIAL_QUANTITY
    }

    const createdItemResponse = await CartClient.addItemToUserCart(cartItemCreationData)

    setIsAddingProductToCart(false)

    if (createdItemResponse.status !== CREATED_STATUS) {
      ToastService.error('Could not add product to cart. Please try again.')
      return
    }

    addProductToCartStore(createdItemResponse.data.product, CART_ITEM_CREATION_INITIAL_QUANTITY)
  }, [product.id, addProductToCartStore])

  const addProductToCart = useCallback(async () => {
    if (auth.status === 'authenticated') {
      await addProductToRemoteCart()
      return
    }

    addProductToCartStore(
      product,
      CART_ITEM_CREATION_INITIAL_QUANTITY
    )
  }, [addProductToCartStore, addProductToRemoteCart, auth.status, product])

  return (
    <Button
      className='add-product-to-cart-button'
      isPending={isAddingProductToCart}
      onPress={addProductToCart}
    >
      {isAddingProductToCart ? <Spinner /> : <ShoppingBasketIcon aria-hidden />}
    </Button>
  )
}
