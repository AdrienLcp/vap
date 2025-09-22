import { ShoppingCartIcon } from 'lucide-react'

import { t } from '@/infrastructure/i18n'
import { Button } from '@/presentation/components/ui/pressables/button'

import './cart-button.sass'

type CartButtonProps = {
  itemCount: number
  onPress?: () => void
}

export const CartButton: React.FC<CartButtonProps> = ({ itemCount, onPress }) => (
  <Button
    aria-label={t('cart.button.ariaLabel')}
    className='cart-button'
    onPress={onPress}
    tooltip={t('cart.button.itemCountTooltip', { itemCount })}
  >
    <ShoppingCartIcon aria-hidden />

    <span className='item-count'>
      {itemCount}
    </span>
  </Button>
)
