import 'server-only'

import { redirect } from 'next/navigation'

import { ROUTES } from '@/domain/navigation'
import { CategoryCreationLink } from '@/features/category/presentation/components/category-creation-link'
import { CategoryList } from '@/features/category/presentation/components/category-list'
import { CategoryController } from '@/features/category/presentation/controllers/category-controller'
import { OK_STATUS } from '@/infrastructure/api/http-response'

import './categories-admin-page.sass'

export const ProductsAdminPage: React.FC = async () => {
  const categoriesResponse = await CategoryController.findCategories()

  if (categoriesResponse.status !== OK_STATUS) {
    redirect(ROUTES.notFound)
  }

  return (
    <div className='categories-admin-page'>
      <CategoryCreationLink />

      <CategoryList categories={categoriesResponse.data} />
    </div>
  )
}
