import { CategoryCreationForm } from '@/category/presentation/components/category-creation-form'
import { ProductCreationForm } from '@/product/presentation/components/product-creation-form'

export const AdminPage: React.FC = () => (
  <>
    <CategoryCreationForm />
    <ProductCreationForm />
  </>
)
