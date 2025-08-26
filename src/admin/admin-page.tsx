import { CategoryCreationForm } from '@/category/presentation/components/category-creation-form'
import { ProductCreationForm } from '@/product/presentation/components/product-creation-form'

import './admin-page.sass'

export const AdminPage: React.FC = () => (
  <>
    <section className='admin-section'>
      <h2>Créer une catégorie</h2>
      <CategoryCreationForm />
    </section>

    <section className='admin-section'>
      <h2>Créer un produit</h2>
      <ProductCreationForm categories={[]} />
    </section>
  </>
)
