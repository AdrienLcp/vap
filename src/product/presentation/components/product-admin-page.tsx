import { CategoryController } from '@/category/presentation/controllers/category-controller'
import { ROUTES } from '@/domain/navigation'
import { OK_STATUS, redirectByErrorStatus } from '@/infrastructure/api/http-response'
import { ProductUpdateForm } from '@/product/presentation/components/product-update-form'
import { ProductController } from '@/product/presentation/controllers/product-controller'

export type ProductAdminPageProps = {
  productId: string
}

export const ProductAdminPage: React.FC<ProductAdminPageProps> = async ({ productId }) => {
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

  return <ProductUpdateForm categories={categoriesResponse.data} product={productResponse.data} />
}
