import { CATEGORY_CONSTANTS, CATEGORY_FORM_FIELDS } from '@/category/domain/category-constants'
import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'

export const CategoryDescriptionField: React.FC<Partial<TextFieldProps>> = ({
  label = t('category.fields.description.label'),
  name = CATEGORY_FORM_FIELDS.DESCRIPTION,
  placeholder = t('category.fields.description.placeholder'),
  ...categoryDescriptionFieldRestProps
}) => (
  <TextField
    {...categoryDescriptionFieldRestProps}
    label={label}
    maxLength={CATEGORY_CONSTANTS.DESCRIPTION_MAX_LENGTH}
    name={name}
    placeholder={placeholder}
  />
)
