import { PRODUCT_FORM_FIELDS } from '@/features/product/domain/product-constants'
import { ProductPriceField } from '@/features/product/presentation/components/forms/product-price-field'
import { t } from '@/infrastructure/i18n'
import type { NumberFieldProps } from '@/presentation/components/forms/number-field'

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
