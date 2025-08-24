import { t } from '@/infrastructure/i18n'
import { Select, type SelectItem, type SelectProps } from '@/presentation/components/forms/select'
import { PRODUCT_FORM_FIELDS } from '@/product/domain/product-constants'

type ProductCategorySelectProps = Omit<Partial<SelectProps>, 'items'> & {
  items: SelectItem[]
}

export const ProductCategorySelect: React.FC<ProductCategorySelectProps> = ({
  label = t('product.fields.category.label'),
  name = PRODUCT_FORM_FIELDS.CATEGORY_ID,
  ...productCategorySelectRestProps
}) => (
  <Select
    {...productCategorySelectRestProps}
    label={label}
    name={name}
  />
)
