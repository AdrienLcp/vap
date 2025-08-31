import { redirect } from 'next/navigation'

import { CategoryController } from '@/category/presentation/controllers/category-controller'
import { ROUTES } from '@/domain/navigation'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { ProductCreationForm } from '@/product/presentation/components/product-creation-form'

import './product-creation-page.sass'

export const ProductCreationPage: React.FC = async () => {
  const categoriesResponse = await CategoryController.findCategories()

  if (categoriesResponse.status !== OK_STATUS) {
    redirect(ROUTES.notFound)
  }

  return (
    <section className='product-creation-page'>
      <h1>{t('product.creation.title')}</h1>

      <ProductCreationForm categories={categoriesResponse.data} />
    </section>
  )
}
