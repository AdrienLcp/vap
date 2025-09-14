import { CATEGORY_CONSTANTS, CATEGORY_FORM_FIELDS } from '@/features/category/domain/category-constants'
import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'

export const CategoryNameField: React.FC<Partial<TextFieldProps>> = ({
  isRequired = true,
  label = t('category.fields.name.label'),
  name = CATEGORY_FORM_FIELDS.NAME,
  placeholder = t('category.fields.name.placeholder'),
  ...categoryNameFieldRestProps
}) => (
  <TextField
    isRequired={isRequired}
    label={label}
    maxLength={CATEGORY_CONSTANTS.NAME_MAX_LENGTH}
    name={name}
    placeholder={placeholder}
    {...categoryNameFieldRestProps}
  />
)
