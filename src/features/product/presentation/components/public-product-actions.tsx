'use client'

import { useCartStore } from '@/features/cart/application/use-cart-store'
import { AddProductToCartButton } from '@/features/product/presentation/components/add-product-to-cart-button'
import { ProductQuantitySelector } from '@/features/product/presentation/components/product-quantity-selector'

type PublicProductActionsProps = {
  productId: string
}

export const PublicProductActions: React.FC<PublicProductActionsProps> = ({ productId }) => {
  const cartProductQuantity = useCartStore(state => state.getProductQuantity(productId))

  if (cartProductQuantity <= 0) {
    return <AddProductToCartButton productId={productId} />
  }

  return <ProductQuantitySelector productId={productId} />
}
