import { redirect } from 'next/navigation'

import { ROUTES } from '@/domain/navigation'
import { CategoryUpdateForm } from '@/features/category/presentation/components/forms/category-update-form'
import { CategoryController } from '@/features/category/presentation/controllers/category-controller'

type CategoryPageProps = {
  categoryId: string
}

export const CategoryPage: React.FC<CategoryPageProps> = async ({ categoryId }) => {
  const categoryResult = await CategoryController.findCategory(categoryId)

  if (categoryResult.status !== 200) {
    redirect(ROUTES.notFound)
  }

  return (
    <>
      <h1>Category Page</h1>

      <CategoryUpdateForm category={categoryResult.data} />
    </>
  )
}
