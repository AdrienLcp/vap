import { ROUTES } from '@/domain/navigation'
import { CategoryController } from '@/features/category/presentation/controllers/category-controller'
import { ProductUpdateForm } from '@/features/product/presentation/components/product-update-form'
import { ProductController } from '@/features/product/presentation/controllers/product-controller'
import { OK_STATUS, redirectByErrorStatus } from '@/infrastructure/api/http-response'

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
