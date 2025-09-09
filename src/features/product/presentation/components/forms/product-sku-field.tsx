import { PRODUCT_CONSTANTS, PRODUCT_FORM_FIELDS } from '@/features/product/domain/product-constants'
import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'

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
    maxLength={PRODUCT_CONSTANTS.SKU_MAX_LENGTH}
    minLength={PRODUCT_CONSTANTS.SKU_MIN_LENGTH}
    name={name}
  />
)
