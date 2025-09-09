import { ROUTES } from '@/domain/navigation'
import { CategoryController } from '@/features/category/presentation/controllers/category-controller'
import { ProductUpdateForm } from '@/features/product/presentation/components/forms/product-update-form'
import { ProductController } from '@/features/product/presentation/controllers/product-controller'
import { OK_STATUS, redirectByErrorStatus } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'

import './product-page.sass'

export type ProductPageProps = {
  productId: string
}

export const ProductPage: React.FC<ProductPageProps> = async ({ productId }) => {
  const [categoriesResponse, productResponse] = await Promise.all([
    CategoryController.findCategories(),
    ProductController.findProduct(productId)
  ])

  if (categoriesResponse.status !== OK_STATUS) {
    redirectByErrorStatus(categoriesResponse.status, ROUTES.notFound)
    return null
  }

  if (productResponse.status !== OK_STATUS) {
    redirectByErrorStatus(productResponse.status, ROUTES.notFound)
    return null
  }

  return (
    <div className='product-page'>
      <h1>{t('product.update.title')}</h1>

      <ProductUpdateForm categories={categoriesResponse.data} product={productResponse.data} />
    </div>
  )
}
