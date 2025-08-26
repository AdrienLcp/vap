import { CATEGORY_FORM_FIELDS } from '@/category/domain/category-constants'
import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'

export const CategoryImageUrlField: React.FC<Partial<TextFieldProps>> = ({
  label = t('category.fields.image.label'),
  name = CATEGORY_FORM_FIELDS.IMAGE_URL,
  placeholder = t('category.fields.image.placeholder'),
  ...categoryImageUrlFieldRestProps
}) => (
  <TextField
    {...categoryImageUrlFieldRestProps}
    label={label}
    name={name}
    placeholder={placeholder}
    type='url'
  />
)
