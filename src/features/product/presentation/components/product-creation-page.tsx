import { redirect } from 'next/navigation'

import { ROUTES } from '@/domain/navigation'
import { CategoryController } from '@/features/category/presentation/controllers/category-controller'
import { ProductCreationForm } from '@/features/product/presentation/components/forms/product-creation-form'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'

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
