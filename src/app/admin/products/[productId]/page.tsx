import type { PARAMS } from '@/domain/navigation'
import { ProductAdminPage } from '@/features/product/presentation/components/product-admin-page'
import type { PageParams } from '@/utils/next-utils'

const Page: React.FC<PageParams<typeof PARAMS.productId>> = async ({ params }) => {
  const { productId } = await params

  return <ProductAdminPage productId={productId} />
}

export default Page
