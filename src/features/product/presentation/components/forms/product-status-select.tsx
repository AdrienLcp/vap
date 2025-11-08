import { PRODUCT_CONSTANTS, PRODUCT_FORM_FIELDS } from '@/features/product/domain/product-constants'
import type { ProductStatus } from '@/features/product/domain/product-entities'
import { t } from '@/infrastructure/i18n'
import { Select, type SelectItem, type SelectProps } from '@/presentation/components/forms/select'

const productStatusSelectItems: SelectItem<ProductStatus>[] = [
  { id: 'ACTIVE', textValue: t('product.status.active') },
  { id: 'INACTIVE', textValue: t('product.status.inactive') },
  { id: 'FEATURED', textValue: t('product.status.featured') }
]

export const ProductStatusSelect: React.FC<Partial<SelectProps<ProductStatus>>> = ({
  defaultValue = PRODUCT_CONSTANTS.DEFAULT_STATUS,
  isRequired = true,
  items = productStatusSelectItems,
  label = t('product.fields.status.label'),
  name = PRODUCT_FORM_FIELDS.STATUS,
  ...productStatusSelectRestProps
}) => (
  <Select
    defaultValue={defaultValue}
    isRequired={isRequired}
    items={items}
    label={label}
    name={name}
    {...productStatusSelectRestProps}
  />
)
