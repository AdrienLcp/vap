import 'server-only'

import { ROUTES } from '@/domain/navigation'
import { CheckoutSuccessCartClearer } from '@/features/payment/presentation/components/checkout-success-cart-clearer'
import { CheckoutController } from '@/features/payment/presentation/controllers/checkout-controller'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { formatPrice } from '@/infrastructure/format/price-formatter'
import { t } from '@/infrastructure/i18n'
import { Link } from '@/presentation/components/ui/pressables/link'

import './checkout-success-page.sass'

type CheckoutSuccessPageProps = {
  sessionId: string | null
}

export const CheckoutSuccessPage: React.FC<CheckoutSuccessPageProps> = async ({
  sessionId
}) => {
  const orderResponse = sessionId
    ? await CheckoutController.findOrderByCheckoutSession(sessionId)
    : null

  const order =
    orderResponse && orderResponse.status === OK_STATUS
      ? orderResponse.data
      : null

  return (
    <main className='checkout-success-page'>
      <CheckoutSuccessCartClearer />

      <h1>{t('checkout.success.title')}</h1>
      <p>{t('checkout.success.description')}</p>

      {order !== null && (
        <section className='order-recap'>
          <h2>
            {t('checkout.success.orderNumber', {
              orderSuffix: order.id.slice(-8)
            })}
          </h2>

          {order.status === 'PENDING' && (
            <p className='pending-note'>{t('checkout.success.pending')}</p>
          )}

          <ul className='items'>
            {order.items.map((item) => (
              <li key={item.id}>
                <span className='name'>{item.product.name}</span>
                <span className='quantity'>× {item.quantity}</span>
                <span className='price'>
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <p className='total'>
            <strong>{t('checkout.totalLabel')} :</strong>{' '}
            {formatPrice(order.totalPrice)}
          </p>
        </section>
      )}

      <Link href={ROUTES.home} variant='filled'>
        {t('checkout.success.backHome')}
      </Link>
    </main>
  )
}
