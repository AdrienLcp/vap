import { PRODUCT_CONSTANTS, PRODUCT_FORM_FIELDS } from '@/features/product/domain/product-constants'
import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'

export const ProductNameField: React.FC<Partial<TextFieldProps>> = ({
  label = t('product.fields.name.label'),
  name = PRODUCT_FORM_FIELDS.NAME,
  placeholder = t('product.fields.name.placeholder'),
  ...productNameFieldProps
}) => (
  <TextField
    isRequired
    label={label}
    maxLength={PRODUCT_CONSTANTS.NAME_MAX_LENGTH}
    name={name}
    placeholder={placeholder}
    {...productNameFieldProps}
  />
)
