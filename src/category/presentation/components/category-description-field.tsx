import { CATEGORY_CONSTANTS, CATEGORY_FORM_FIELDS } from '@/category/domain/category-constants'
import { t } from '@/infrastructure/i18n'
import { TextField } from '@/presentation/components/forms/text-field'

export const CategoryDescriptionField: React.FC = () => (
  <TextField
    label={t('category.create.form.description.label')}
    maxLength={CATEGORY_CONSTANTS.DESCRIPTION_MAX_LENGTH}
    name={CATEGORY_FORM_FIELDS.DESCRIPTION}
    placeholder={t('category.create.form.description.placeholder')}
  />
)
