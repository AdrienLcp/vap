import { CATEGORY_CONSTANTS, CATEGORY_FORM_FIELDS } from '@/category/domain/category-constants'
import { t } from '@/infrastructure/i18n'
import { TextField } from '@/presentation/components/forms/text-field'

export const CategoryNameField: React.FC = () => (
  <TextField
    isRequired
    label={t('category.create.form.name.label')}
    maxLength={CATEGORY_CONSTANTS.NAME_MAX_LENGTH}
    name={CATEGORY_FORM_FIELDS.NAME}
    placeholder={t('category.create.form.name.placeholder')}
  />
)
