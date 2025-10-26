'use client'

import { GridList, GridListItem } from 'react-aria-components'

import { useCartStore } from '@/features/cart/application/use-cart-store'
import { CartItem } from '@/features/cart/presentation/components/cart-item'
import { t } from '@/infrastructure/i18n'

import './cart-item-list.sass'

export const CartItemList: React.FC = () => {
  const cartItems = useCartStore((state) => state.items)

  if (cartItems.size === 0) {
    return <p className='cart-list-empty-message'>{t('cart.list.empty')}</p>
  }

  const cartItemList = Array.from(cartItems.values())

  return (
    <GridList aria-label={t('cart.ariaLabel')} className='cart-list' items={cartItemList}>
      {(item) => (
        <GridListItem id={item.product.id} textValue={item.product.name}>
          <CartItem item={item} />
        </GridListItem>
      )}
    </GridList>
  )
}
