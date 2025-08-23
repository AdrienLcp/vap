import { t } from '@/infrastructure/i18n'
import type { NumberFieldProps } from '@/presentation/components/forms/number-field'
import { PRODUCT_FORM_FIELDS } from '@/product/domain/product-constants'
import { ProductPriceField } from '@/product/presentation/components/product-price-field'

export const ProductDiscountedPriceField: React.FC<Partial<NumberFieldProps>> = ({
  description = t('product.fields.discountedPrice.description'),
  label = t('product.fields.discountedPrice.label'),
  name = PRODUCT_FORM_FIELDS.DISCOUNTED_PRICE,
  ...productDiscountedPriceFieldRestProps
}) => (
  <ProductPriceField
    {...productDiscountedPriceFieldRestProps}
    description={description}
    isRequired={false}
    label={label}
    name={name}
  />
)
