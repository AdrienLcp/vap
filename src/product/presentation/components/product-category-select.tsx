import { t } from '@/infrastructure/i18n'
import { Select, type SelectItem } from '@/presentation/components/forms/select'
import { PRODUCT_FORM_FIELDS } from '@/product/domain/product-constants'

type ProductCategorySelectProps = {
  items: SelectItem[]
}

export const ProductCategorySelect: React.FC<ProductCategorySelectProps> = ({ items }) => (
  <Select
    items={items}
    label={t('product.fields.category.label')}
    name={PRODUCT_FORM_FIELDS.CATEGORY_ID}
  />
)
