import { useCallback, useEffect, useState } from 'react'
import type { Key } from 'react-aria-components'

import type { CategoryDTO } from '@/features/category/domain/category-entities'
import { CategoryClient } from '@/features/category/infrastructure/category-client'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Select, type SelectItem } from '@/presentation/components/forms/select'
import { Loader } from '@/presentation/components/ui/loaders/loader'

type ProductCategoryFilterProps = {
  selectedCategoryIds: string[]
  isLoadingProducts: boolean
  onCategoriesFilterChange: (categoryIds: string[]) => void
}

export const ProductCategoryFilter: React.FC<ProductCategoryFilterProps> = ({
  selectedCategoryIds,
  isLoadingProducts,
  onCategoriesFilterChange
}) => {
  const [categories, setCategories] = useState<CategoryDTO[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  const loadCategories = useCallback(async () => {
    setIsLoadingCategories(true)
    const categoryListResponse = await CategoryClient.findCategories()
    setIsLoadingCategories(false)

    if (categoryListResponse.status === OK_STATUS) {
      setCategories(categoryListResponse.data)
    }
  }, [])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  const onCategoriesFilterSelectionChange = useCallback(
    (categoryIds: Key[]) => {
      const stringCategoryIds = categoryIds.map((id) => String(id))
      onCategoriesFilterChange(stringCategoryIds)
    },
    [onCategoriesFilterChange]
  )

  if (isLoadingCategories) {
    return <Loader />
  }

  if (categories.length === 0) {
    return null
  }

  const categorySelectItems: SelectItem[] = categories.map((category) => ({
    id: category.id,
    textValue: category.name
  }))

  return (
    <Select
      isDisabled={isLoadingProducts}
      items={categorySelectItems}
      label={t('product.filters.categories.label')}
      onChange={onCategoriesFilterSelectionChange}
      placeholder={t('product.filters.categories.placeholder')}
      selectionMode='multiple'
      value={selectedCategoryIds}
    />
  )
}
