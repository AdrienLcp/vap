import { PRODUCT_FORM_FIELDS } from '@/features/product/domain/product-constants'
import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'

type ProductImageUrlFieldProps = Omit<Partial<TextFieldProps>, 'defaultValue' | 'value'> & {
  defaultValue?: string | null
  value?: string | null
}

export const ProductImageUrlField: React.FC<ProductImageUrlFieldProps> = ({
  defaultValue,
  label = t('product.fields.imageUrl.label'),
  name = PRODUCT_FORM_FIELDS.IMAGE_URL,
  value,
  ...productImageUrlFieldRestProps
}) => (
  <TextField
    defaultValue={defaultValue ?? undefined}
    label={label}
    name={name}
    type='url'
    value={value ?? undefined}
    {...productImageUrlFieldRestProps}
  />
)
