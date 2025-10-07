'use client'

import { GridList, GridListItem } from 'react-aria-components'

import { useCartStore } from '@/features/cart/application/use-cart-store'
import { t } from '@/infrastructure/i18n'

import './cart-item-list.sass'

export const CartItemList: React.FC = () => {
  const items = useCartStore(state => state.items)

  if (items.size === 0) {
    return <p className='cart-list-empty-message'>{t('cart.list.empty')}</p>
  }

  const itemList = Array.from(items.values())

  return (
    <GridList items={itemList}>
      {item => (
        <GridListItem
          id={item.product.id}
          textValue={item.product.name}
        >
          {item.product.name} - Quantity: {item.quantity} - Price: ${item.product.price}
        </GridListItem>
      )}
    </GridList>
  )
}
