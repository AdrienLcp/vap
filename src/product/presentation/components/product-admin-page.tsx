import { CategoryController } from '@/category/presentation/category-controller'
import { ROUTES } from '@/domain/navigation'
import { errorRedirectByStatus, OK_STATUS } from '@/infrastructure/api/http-response'
import { ProductUpdateForm } from '@/product/presentation/components/product-update-form'
import { ProductController } from '@/product/presentation/product-controller'
import type { Params } from '@/utils/next-utils'

export type ProductAdminPageProps = {
  params: Params<'productId'>
}

export const ProductAdminPage: React.FC<ProductAdminPageProps> = async ({ params }) => {
  const { productId } = await params

  const productResponse = await ProductController.findProduct(productId)
  const categoriesResponse = await CategoryController.findCategories()

  if (categoriesResponse.status != OK_STATUS) {
    throw new Error('test')
  }

  switch (productResponse.status) {
    case OK_STATUS:
      return <ProductUpdateForm categories={categoriesResponse.data} product={productResponse.data} />
    default:
      errorRedirectByStatus(productResponse.status, ROUTES.notFound)
  }
}
