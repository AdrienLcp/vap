import { OrderAdminPage } from '@/features/order/presentation/components/order-admin-page'

const Page: React.FC<PageProps<'/admin/orders/[orderId]'>> = async ({
  params
}) => {
  const { orderId } = await params

  return <OrderAdminPage orderId={orderId} />
}

export default Page
