import { useCartStore } from '@/features/cart/application/use-cart-store'
import { CartClearButton } from '@/features/cart/presentation/components/cart-clear-button'
import { CartOrderLink } from '@/features/cart/presentation/components/cart-order-link'
import { formatPrice } from '@/infrastructure/format/price-formatter'
import { t } from '@/infrastructure/i18n'

import './cart-panel-footer.sass'

export const CartPanelFooter: React.FC = () => {
  const cartTotalPrice = useCartStore((state) => state.getTotalPrice())

  return (
    <div className='cart-panel-footer'>
      <p className='total-price'>
        {t('cart.totalPrice', { totalPrice: formatPrice(cartTotalPrice) })}
      </p>

      <CartClearButton />

      <CartOrderLink />
    </div>
  )
}
