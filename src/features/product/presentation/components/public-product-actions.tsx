'use client'

import { useCartStore } from '@/features/cart/application/use-cart-store'
import type { ProductPublicDTO } from '@/features/product/domain/product-entities'
import { AddProductToCartButton } from '@/features/product/presentation/components/add-product-to-cart-button'
import { ProductQuantitySelector } from '@/features/product/presentation/components/product-quantity-selector'

type PublicProductActionsProps = {
  product: ProductPublicDTO
}

export const PublicProductActions: React.FC<PublicProductActionsProps> = ({ product }) => {
  const cartProductQuantity = useCartStore((state) => state.getProductQuantity(product.id))

  if (cartProductQuantity <= 0) {
    return <AddProductToCartButton product={product} />
  }

  return <ProductQuantitySelector productId={product.id} />
}
