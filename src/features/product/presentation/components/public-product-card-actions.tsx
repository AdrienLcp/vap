'use client'

import { useCartStore } from '@/features/cart/application/use-cart-store'
import { AddProductToCartButton } from '@/features/product/presentation/components/add-product-to-cart-button'
import { ProductQuantitySelector } from '@/features/product/presentation/components/product-quantity-selector'

type PublicProductCardActionsProps = {
  productId: string
}

export const PublicProductCardActions: React.FC<PublicProductCardActionsProps> = ({ productId }) => {
  const cartProductQuantity = useCartStore(state => state.getProductQuantity(productId))

  if (cartProductQuantity <= 0) {
    return <AddProductToCartButton productId={productId} />
  }

  return <ProductQuantitySelector cartProductQuantity={cartProductQuantity} productId={productId} />
}
