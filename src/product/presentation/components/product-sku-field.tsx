import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'
import { PRODUCT_FORM_FIELDS } from '@/product/domain/product-constants'

export const ProductSkuField: React.FC<Partial<TextFieldProps>> = ({
  description = t('product.fields.sku.description'),
  label = t('product.fields.sku.label'),
  name = PRODUCT_FORM_FIELDS.SKU,
  ...productSkuFieldRestProps
}) => (
  <TextField
    {...productSkuFieldRestProps}
    description={description}
    isRequired
    label={label}
    name={name}
  />
)
