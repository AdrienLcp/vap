import { PRODUCT_CONSTANTS, PRODUCT_FORM_FIELDS } from '@/features/product/domain/product-constants'
import { t } from '@/infrastructure/i18n'
import { NumberField, type NumberFieldProps } from '@/presentation/components/forms/number-field'

export const ProductStockField: React.FC<Partial<NumberFieldProps>> = ({
  description = t('product.fields.stock.description'),
  isRequired = true,
  label = t('product.fields.stock.label'),
  name = PRODUCT_FORM_FIELDS.STOCK,
  ...productStockFieldRestProps
}) => (
  <NumberField
    defaultValue={PRODUCT_CONSTANTS.MIN_STOCK}
    description={description}
    isRequired={isRequired}
    label={label}
    minValue={PRODUCT_CONSTANTS.MIN_STOCK}
    name={name}
    {...productStockFieldRestProps}
  />
)
