import { t } from '@/infrastructure/i18n'
import { Select, type SelectItem } from '@/presentation/components/forms/select'
import { PRODUCT_CONSTANTS, PRODUCT_FORM_FIELDS } from '@/product/domain/product-constants'
import type { ProductStatus } from '@/product/domain/product-entities'

const productStatusSelectItems: SelectItem<ProductStatus>[] = [
  { id: 'ACTIVE', textValue: t('product.status.active') },
  { id: 'INACTIVE', textValue: t('product.status.inactive') },
  { id: 'FEATURED', textValue: t('product.status.featured') }
]

export const ProductStatusSelect: React.FC = () => (
  <Select
    defaultSelectedKey={PRODUCT_CONSTANTS.DEFAULT_STATUS}
    items={productStatusSelectItems}
    label={t('product.fields.status.label')}
    name={PRODUCT_FORM_FIELDS.STATUS}
  />
)
