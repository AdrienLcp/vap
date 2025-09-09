import 'server-only'

import { redirect } from 'next/navigation'

import { ROUTES } from '@/domain/navigation'
import { ProductCreationLink } from '@/features/product/presentation/components/product-creation-link'
import { ProductList } from '@/features/product/presentation/components/product-list'
import { ProductController } from '@/features/product/presentation/controllers/product-controller'
import { OK_STATUS } from '@/infrastructure/api/http-response'

import './products-admin-page.sass'

export const ProductsAdminPage: React.FC = async () => {
  const productsResponse = await ProductController.findProducts()

  if (productsResponse.status !== OK_STATUS) {
    redirect(ROUTES.notFound)
  }

  return (
    <div className='products-admin-page'>
      <ProductCreationLink />

      <ProductList products={productsResponse.data} />
    </div>
  )
}
