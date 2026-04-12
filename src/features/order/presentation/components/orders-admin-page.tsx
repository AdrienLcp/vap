import 'server-only'

import { redirect } from 'next/navigation'

import { ROUTES } from '@/domain/navigation'
import { OrdersTable } from '@/features/order/presentation/components/orders-table'
import { OrderController } from '@/features/order/presentation/controllers/order-controller'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'

import './orders-admin-page.sass'

export const OrdersAdminPage: React.FC = async () => {
  const ordersResponse = await OrderController.findOrders()

  if (ordersResponse.status !== OK_STATUS) {
    redirect(ROUTES.notFound)
  }

  return (
    <div className='orders-admin-page'>
      <h1>{t('order.admin.title')}</h1>

      <OrdersTable orders={ordersResponse.data} />
    </div>
  )
}
