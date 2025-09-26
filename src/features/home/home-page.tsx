import { PublicProductList } from '@/features/product/presentation/components/public-product-list'
import { ProductController } from '@/features/product/presentation/controllers/product-controller'
import { OK_STATUS, redirectByErrorStatus } from '@/infrastructure/api/http-response'

export const HomePage: React.FC = async () => {
  const publicProductListResponse = await ProductController.findPublicProducts()

  if (publicProductListResponse.status !== OK_STATUS) {
    redirectByErrorStatus(publicProductListResponse.status)
    return null
  }

  return (
    <main className='home-main'>
      <PublicProductList products={publicProductListResponse.data} />
    </main>
  )
}
