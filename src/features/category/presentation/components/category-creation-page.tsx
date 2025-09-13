import { CategoryCreationForm } from '@/features/category/presentation/components/forms/category-creation-form'
import { t } from '@/infrastructure/i18n'

import './category-creation-page.sass'

export const CategoryCreationPage: React.FC = () => (
  <section className='category-creation-page'>
    <h1>{t('category.creation.title')}</h1>

    <CategoryCreationForm />
  </section>
)
