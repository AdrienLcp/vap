'use client'

import { useCallback, useState } from 'react'

import { getAdminCategoryRoute } from '@/domain/navigation'
import { CATEGORY_CONSTANTS } from '@/features/category/domain/category-constants'
import type { CategoryDTO } from '@/features/category/domain/category-entities'
import { CategoryCard } from '@/features/category/presentation/components/category-card'
import { t } from '@/infrastructure/i18n'
import { Grid, type GridItem } from '@/presentation/components/ui/grid'

type CategoryListProps = {
  categories: CategoryDTO[]
}

const renderCategoryListEmptyState = () => <p>{t('category.list.empty')}</p>

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const [categoryList, setCategoryList] = useState<CategoryDTO[]>(categories)

  const categoryGridItems: GridItem<CategoryDTO>[] = categoryList.map(category => ({
    ...category,
    href: getAdminCategoryRoute(category.id),
    textValue: category.name
  }))

  const renderCategoryItem = useCallback((categoryItem: GridItem<CategoryDTO>) => (
    <CategoryCard category={categoryItem} setCategoryList={setCategoryList} />
  ), [])

  return (
    <Grid
      aria-label={t('category.list.ariaLabel')}
      cardSize={CATEGORY_CONSTANTS.IMAGE_SIZE_IN_PX}
      items={categoryGridItems}
      renderEmptyState={renderCategoryListEmptyState}
      renderItem={renderCategoryItem}
    />
  )
}
