import { CATEGORY_FORM_FIELDS } from '@/features/category/domain/category-constants'
import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'

type CategoryImageUrlFieldProps = Omit<Partial<TextFieldProps>, 'defaultValue' | 'value'> & {
  defaultValue?: string | null
  value?: string | null
}

export const CategoryImageUrlField: React.FC<CategoryImageUrlFieldProps> = ({
  defaultValue,
  label = t('category.fields.image.label'),
  name = CATEGORY_FORM_FIELDS.IMAGE_URL,
  placeholder = t('category.fields.image.placeholder'),
  value,
  ...categoryImageUrlFieldRestProps
}) => (
  <TextField
    defaultValue={defaultValue ?? undefined}
    label={label}
    name={name}
    placeholder={placeholder}
    type='url'
    value={value ?? undefined}
    {...categoryImageUrlFieldRestProps}
  />
)
