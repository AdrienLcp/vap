import 'server-only'

import { redirect } from 'next/navigation'

import { ROUTES } from '@/domain/navigation'
import { OrderStatusSelector } from '@/features/order/presentation/components/order-status-selector'
import { OrderController } from '@/features/order/presentation/controllers/order-controller'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { formatPrice } from '@/infrastructure/format/price-formatter'
import { t } from '@/infrastructure/i18n'
import { Link } from '@/presentation/components/ui/pressables/link'

import './order-admin-page.sass'

type OrderAdminPageProps = {
  orderId: string
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(date))

export const OrderAdminPage: React.FC<OrderAdminPageProps> = async ({
  orderId
}) => {
  const orderResponse = await OrderController.findOrder(orderId)

  if (orderResponse.status !== OK_STATUS) {
    redirect(ROUTES.notFound)
  }

  const order = orderResponse.data

  return (
    <div className='order-admin-page'>
      <Link href={ROUTES.adminOrders} variant='underlined'>
        {t('order.admin.title')}
      </Link>

      <h1>
        {t('order.admin.orderId')} #{order.id.slice(-8)}
      </h1>

      <div className='order-meta'>
        <p>
          <strong>{t('order.admin.customerEmail')} :</strong> {order.user.email}
        </p>
        <p>
          <strong>{t('order.admin.date')} :</strong>{' '}
          {formatDate(order.createdAt)}
        </p>
        <p>
          <strong>{t('order.admin.totalPrice')} :</strong>{' '}
          {formatPrice(order.totalPrice)}
        </p>
        {order.stripeCheckoutSessionId && (
          <p>
            <strong>{t('order.admin.stripeSessionId')} :</strong>{' '}
            <code>{order.stripeCheckoutSessionId}</code>
          </p>
        )}
        {order.stripePaymentIntentId && (
          <p>
            <strong>{t('order.admin.stripePaymentIntentId')} :</strong>{' '}
            <code>{order.stripePaymentIntentId}</code>
          </p>
        )}
      </div>

      <OrderStatusSelector orderId={order.id} status={order.status} />

      <section className='order-items'>
        <h2>{t('order.admin.itemsTitle')}</h2>
        <table>
          <thead>
            <tr>
              <th>{t('order.admin.productName')}</th>
              <th>{t('order.admin.quantity')}</th>
              <th>{t('order.admin.unitPrice')}</th>
              <th>{t('order.admin.totalPrice')}</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id}>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>{formatPrice(item.unitPrice)}</td>
                <td>{formatPrice(item.unitPrice * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
