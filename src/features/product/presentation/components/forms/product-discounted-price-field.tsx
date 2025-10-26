import { PRODUCT_FORM_FIELDS } from '@/features/product/domain/product-constants'
import { ProductPriceField } from '@/features/product/presentation/components/forms/product-price-field'
import { t } from '@/infrastructure/i18n'
import type { NumberFieldProps } from '@/presentation/components/forms/number-field'

type ProductDiscountedPriceFieldProps = Omit<
  Partial<NumberFieldProps>,
  'defaultValue' | 'value'
> & {
  defaultValue?: number | null
  value?: number | null
}

export const ProductDiscountedPriceField: React.FC<ProductDiscountedPriceFieldProps> = ({
  defaultValue,
  description = t('product.fields.discountedPrice.description'),
  label = t('product.fields.discountedPrice.label'),
  name = PRODUCT_FORM_FIELDS.DISCOUNTED_PRICE,
  value,
  ...productDiscountedPriceFieldRestProps
}) => (
  <ProductPriceField
    defaultValue={defaultValue ?? undefined}
    description={description}
    isRequired={false}
    label={label}
    name={name}
    value={value ?? undefined}
    {...productDiscountedPriceFieldRestProps}
  />
)
