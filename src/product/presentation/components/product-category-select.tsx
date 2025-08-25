import React from 'react'

import type { CategoryDTO } from '@/category/domain/category-entities'
import { t } from '@/infrastructure/i18n'
import { Select, type SelectItem, type SelectProps } from '@/presentation/components/forms/select'
import { PRODUCT_FORM_FIELDS } from '@/product/domain/product-constants'

type ProductCategorySelectProps = Partial<Pick<SelectProps, 'label' | 'name'>> & {
  categories: CategoryDTO[]
}

export const ProductCategorySelect: React.FC<ProductCategorySelectProps> = ({
  categories,
  label = t('product.fields.category.label'),
  name = PRODUCT_FORM_FIELDS.CATEGORY_ID
}) => {
  const categorySelectItems: SelectItem[] = React.useMemo(() => {
    return categories.map(category => ({
      ...category,
      textValue: category.name
    }))
  }, [categories])

  return (
    <Select
      items={categorySelectItems}
      label={label}
      name={name}
    />

  )
}
