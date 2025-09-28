import { ShoppingBasketIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

import { CART_CONSTANTS } from '@/features/cart/domain/cart-constants'
import { Button } from '@/presentation/components/ui/pressables/button'
import { QuantitySelector } from '@/presentation/components/ui/quantity-selector'

import './public-product-card-actions.sass'

export const PublicProductCardActions: React.FC = () => {
  const [quantity, setQuantity] = useState(0)
  // const { count, increment } = useCartStore()

  const addProductToCart = useCallback(() => {
    setQuantity(1)
  }, [])

  if (quantity === 0) {
    return (
      <Button className='add-to-cart-button' onPress={addProductToCart}>
        <ShoppingBasketIcon />
      </Button>
    )
  }

  return (
    <QuantitySelector
      max={CART_CONSTANTS.MAX_ITEM_QUANTITY}
      onQuantityChange={setQuantity}
      quantity={quantity}
    />
  )
}
