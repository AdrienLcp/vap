import { redirect } from 'next/navigation'

import { AuthController } from '@/auth/auth-controller'
import { CreateCategoryForm } from '@/category/components/create-category-form'
import { ROUTES } from '@/domain/navigation'
import { CreateProductForm } from '@/product/components/create-product-form'

const AdminPage: React.FC = async () => {
  const authUserResult = await AuthController.findUser()

  if (authUserResult.statusCode !== 200) {
    redirect(ROUTES.unauthorized)
  }

  if (!authUserResult.data.permissions.canAccessAdmin) {
    redirect(ROUTES.forbidden)
  }

  return (
    <>
      <CreateCategoryForm />
      <CreateProductForm />
    </>
  )
}

export default AdminPage
