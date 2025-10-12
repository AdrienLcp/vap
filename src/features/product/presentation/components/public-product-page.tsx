import { PublicProduct } from '@/features/product/presentation/components/public-product'
import { ProductController } from '@/features/product/presentation/controllers/product-controller'
import { OK_STATUS, redirectByErrorStatus } from '@/infrastructure/api/http-response'

type PublicProductPageProps = {
  productId: string
}

export const PublicProductPage: React.FC<PublicProductPageProps> = async ({ productId }) => {
  const productResponse = await ProductController.findPublicProduct(productId)

  if (productResponse.status !== OK_STATUS) {
    redirectByErrorStatus(productResponse.status)
    return null
  }

  return <PublicProduct product={productResponse.data} />
}
