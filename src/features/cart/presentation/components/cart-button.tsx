import { ShoppingCartIcon } from 'lucide-react'

import { t } from '@/infrastructure/i18n'
import { Button } from '@/presentation/components/ui/pressables/button'

import './cart-button.sass'

type CartButtonProps = {
  itemCount: number
}

export const CartButton: React.FC<CartButtonProps> = ({ itemCount }) => (
  <Button
    aria-label={t('cart.button.ariaLabel')}
    className='cart-button'
    tooltip={t('cart.button.itemCountTooltip', { itemCount: 0 })}
  >
    <ShoppingCartIcon aria-hidden />

    <span className='item-count'>
      {itemCount}
    </span>
  </Button>
)
