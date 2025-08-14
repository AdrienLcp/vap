import { CATEGORY_FORM_FIELDS } from '@/category/domain/category-constants'
import { t } from '@/infrastructure/i18n'
import { TextField } from '@/presentation/components/forms/text-field'

export const CategoryImageUrlField: React.FC = () => (
  <TextField
    label={t('category.create.form.image.label')}
    name={CATEGORY_FORM_FIELDS.IMAGE_URL}
    placeholder={t('category.create.form.image.placeholder')}
    type='url'
  />
)
