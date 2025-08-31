import 'server-only'

import { redirect } from 'next/navigation'

import { AuthController } from '@/auth/presentation/controllers/auth-controller'
import { ROUTES } from '@/domain/navigation'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { ProductCreationLink } from '@/product/presentation/components/product-creation-link'
import { ProductsList } from '@/product/presentation/components/products-list'
import { ProductController } from '@/product/presentation/controllers/product-controller'

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
