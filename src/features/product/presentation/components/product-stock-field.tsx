import { PRODUCT_CONSTANTS } from '@/features/product/domain/product-constants'
import { t } from '@/infrastructure/i18n'
import { NumberField, type NumberFieldProps } from '@/presentation/components/forms/number-field'

export const ProductStockField: React.FC<Partial<NumberFieldProps>> = ({
  description = t('product.fields.stock.description'),
  label = t('product.fields.stock.label'),
  ...productStockFieldRestProps
}) => (
  <NumberField
    {...productStockFieldRestProps}
    defaultValue={PRODUCT_CONSTANTS.MIN_STOCK}
    description={description}
    label={label}
    minValue={PRODUCT_CONSTANTS.MIN_STOCK}
  />
)
