import { PRODUCT_FORM_FIELDS } from '@/features/product/domain/product-constants'
import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'

export const ProductImageUrlField: React.FC<Partial<TextFieldProps>> = ({
  label = t('product.fields.imageUrl.label'),
  name = PRODUCT_FORM_FIELDS.IMAGE_URL,
  ...productImageUrlFieldRestProps
}) => (
  <TextField
    {...productImageUrlFieldRestProps}
    label={label}
    name={name}
    type='url'
  />
)
