import { CategoryCreationForm } from '@/features/category/presentation/components/category-creation-form'
import { ProductCreationForm } from '@/features/product/presentation/components/product-creation-form'
import { t } from '@/infrastructure/i18n'

import './admin-page.sass'

export const AdminPage: React.FC = () => (
  <>
    <section className='admin-section'>
      <h2>{t('category.creation.title')}</h2>
      <CategoryCreationForm />
    </section>

    <section className='admin-section'>
      <h2>{t('product.creation.title')}</h2>
      <ProductCreationForm categories={[]} />
    </section>
  </>
)
