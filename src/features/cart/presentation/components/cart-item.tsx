import type { CartItemDTO } from '@/features/cart/domain/cart-entities'
import { CartItemActions } from '@/features/cart/presentation/components/cart-item-actions'
import { ProductImage } from '@/features/product/presentation/components/product-image'
import { t } from '@/infrastructure/i18n'
import { formatPrice } from '@/utils/format-utils'

import './cart-item.sass'

type CartItemProps = {
  item: CartItemDTO
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => (
  <div className='cart-item'>
    <div className='product-info'>
      <ProductImage size='small' src={item.product.imageUrl} />

      <div>
        <div>{item.product.name}</div>
        <div>{t('cart.item.quantity', { quantity: item.quantity })}</div>
        <div>{t('cart.item.unitPrice', { unitPrice: formatPrice(item.product.price) })}</div>
        <div>{t('cart.item.totalPrice', { totalPrice: formatPrice(item.product.price * item.quantity) })}</div>
      </div>
    </div>

    <CartItemActions productId={item.product.id} />
  </div>
)
