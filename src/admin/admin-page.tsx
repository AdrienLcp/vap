import { CreateCategoryForm } from '@/category/presentation/components/create-category-form'
import { CreateProductForm } from '@/product/presentation/components/create-product-form'

export const AdminPage: React.FC = () => (
  <>
    <CreateCategoryForm />
    <CreateProductForm />
  </>
)
