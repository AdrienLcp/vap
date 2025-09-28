import { ShoppingCartIcon } from 'lucide-react'

import { useCartStore } from '@/features/cart/application/use-cart-store'
import { t } from '@/infrastructure/i18n'
import { Button } from '@/presentation/components/ui/pressables/button'

import './cart-button.sass'

export const CartButton: React.FC = () => {
  const totalItemCount = useCartStore(state => state.getItemCount())

  return (
    <Button
      aria-label={t('cart.button.ariaLabel')}
      className='cart-button'
      tooltip={t('cart.button.itemCountTooltip', { itemCount: totalItemCount })}
    >
      <ShoppingCartIcon aria-hidden />

      <span className='item-count'>
        {totalItemCount}
      </span>
    </Button>
  )
}
