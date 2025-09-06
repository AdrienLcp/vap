import 'server-only'

import { redirect } from 'next/navigation'

import { ROUTES } from '@/domain/navigation'
import { AuthController } from '@/features/auth/presentation/controllers/auth-controller'
import { ProductCreationLink } from '@/features/product/presentation/components/product-creation-link'
import { ProductsList } from '@/features/product/presentation/components/products-list'
import { ProductController } from '@/features/product/presentation/controllers/product-controller'
import { OK_STATUS } from '@/infrastructure/api/http-response'

import './products-admin-page.sass'

export const ProductsAdminPage: React.FC = async () => {
  const authUserResponse = await AuthController.findUser()

  if (authUserResponse.status !== OK_STATUS) {
    redirect(ROUTES.unauthorized)
  }

  if (!authUserResponse.data.permissions.canAccessAdmin) {
    redirect(ROUTES.forbidden)
  }

  const productsResponse = await ProductController.findProducts()

  if (productsResponse.status !== OK_STATUS) {
    redirect(ROUTES.notFound)
  }

  return (
    <div className='products-admin-page'>
      <ProductCreationLink />

      <ProductsList products={productsResponse.data} />
    </div>
  )
}
