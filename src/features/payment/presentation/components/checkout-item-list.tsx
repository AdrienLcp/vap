import type { CartItemDTO } from '@/features/cart/domain/cart-entities'
import { formatPrice } from '@/infrastructure/format/price-formatter'
import { t } from '@/infrastructure/i18n'

type CheckoutItemListProps = {
  cartItems: CartItemDTO[]
  shippingCost: number
  subtotal: number
}

export const CheckoutItemList: React.FC<CheckoutItemListProps> = ({
  cartItems,
  shippingCost,
  subtotal
}) => (
  <section>
    <h2>{t('checkout.itemsTitle')}</h2>
    <ul className='items-list'>
      {cartItems.map((item) => (
        <li className='item' key={item.product.id}>
          <span className='item-name'>
            {item.product.name} × {item.quantity}
          </span>
          <span className='item-price'>
            {formatPrice(
              (item.product.discountedPrice ?? item.product.price) *
                item.quantity
            )}
          </span>
        </li>
      ))}
    </ul>
    <p className='line'>
      <span>{t('checkout.subtotalLabel')}</span>
      <span>{formatPrice(subtotal)}</span>
    </p>
    <p className='line'>
      <span>{t('checkout.shippingLabel')}</span>
      <span>
        {shippingCost === 0
          ? t('checkout.shippingFree')
          : formatPrice(shippingCost)}
      </span>
    </p>
    <p className='total'>
      <span>{t('checkout.totalLabel')}</span>
      <span>{formatPrice(subtotal + shippingCost)}</span>
    </p>
  </section>
)
