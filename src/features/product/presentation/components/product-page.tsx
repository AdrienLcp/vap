import 'server-only'

import { ROUTES } from '@/domain/navigation'
import { CategoryController } from '@/features/category/presentation/controllers/category-controller'
import { ProductUpdateForm } from '@/features/product/presentation/components/forms/product-update-form'
import { ProductDeleteButton } from '@/features/product/presentation/components/product-delete-button'
import { ProductController } from '@/features/product/presentation/controllers/product-controller'
import { OK_STATUS, redirectByErrorStatus } from '@/infrastructure/api/http-response'

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

  const product = productResponse.data

  return (
    <div className='product-page'>
      <h1>{product.name}</h1>

      <ProductUpdateForm categories={categoriesResponse.data} product={product} />

      <ProductDeleteButton className='delete-button' productId={product.id} />
    </div>
  )
}
