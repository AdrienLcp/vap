import 'server-only'

import { redirect } from 'next/navigation'

import { ROUTES } from '@/domain/navigation'
import { CategoryDeleteButton } from '@/features/category/presentation/components/category-delete-button'
import { CategoryUpdateForm } from '@/features/category/presentation/components/forms/category-update-form'
import { CategoryController } from '@/features/category/presentation/controllers/category-controller'
import { OK_STATUS } from '@/infrastructure/api/http-response'

import './category-page.sass'

type CategoryPageProps = {
  categoryId: string
}

export const CategoryPage: React.FC<CategoryPageProps> = async ({ categoryId }) => {
  const categoryResponse = await CategoryController.findCategory(categoryId)

  if (categoryResponse.status !== OK_STATUS) {
    redirect(ROUTES.notFound)
  }

  const category = categoryResponse.data

  return (
    <section className='category-page'>
      <h1>{category.name}</h1>

      <CategoryUpdateForm category={category} />

      <CategoryDeleteButton categoryId={category.id} className='delete-button' />
    </section>
  )
}
