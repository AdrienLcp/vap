import { t } from '@/infrastructure/i18n'
import { NumberField, type NumberFieldProps } from '@/presentation/components/forms/number-field'
import { PRODUCT_CONSTANTS, PRODUCT_FORM_FIELDS } from '@/product/domain/product-constants'

const productPriceFormatOptions: Intl.NumberFormatOptions = {
  currency: 'EUR',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  style: 'currency'
}

export const ProductPriceField: React.FC<Partial<NumberFieldProps>> = ({
  isRequired = true,
  label = t('product.fields.price.label'),
  name = PRODUCT_FORM_FIELDS.PRICE,
  ...productPriceFieldProps
}) => (
  <NumberField
    {...productPriceFieldProps}
    formatOptions={productPriceFormatOptions}
    isRequired={isRequired}
    label={label}
    maxValue={PRODUCT_CONSTANTS.MAX_PRICE}
    minValue={PRODUCT_CONSTANTS.MIN_PRICE}
    name={name}
  />
)
