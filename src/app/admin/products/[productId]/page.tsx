import type { PARAMS } from '@/domain/navigation'
import { ProductPage } from '@/features/product/presentation/components/product-page'
import type { PageParams } from '@/utils/next-utils'

const Page: React.FC<PageParams<typeof PARAMS.productId>> = async ({ params }) => {
  const { productId } = await params

  return <ProductPage productId={productId} />
}

export default Page
