'use client'

import { getAdminCategoryRoute } from '@/domain/navigation'
import { CATEGORY_CONSTANTS } from '@/features/category/domain/category-constants'
import type { CategoryDTO } from '@/features/category/domain/category-entities'
import { CategoryCard } from '@/features/category/presentation/components/category-card'
import { t } from '@/infrastructure/i18n'
import { Grid, type GridItem } from '@/presentation/components/ui/grid'
import type { CSSVariables } from '@/presentation/utils/styles-utils'

type CategoryListProps = {
  categories: CategoryDTO[]
}

const categoryListStyle: CSSVariables = {
  '--category-list-card-min-size': `${CATEGORY_CONSTANTS.IMAGE_SIZE_IN_PX}px`
}

const renderCategoryItem = (categoryItem: GridItem<CategoryDTO>) => (
  <CategoryCard category={categoryItem} />
)

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const categoryGridItems: GridItem<CategoryDTO>[] = categories.map(category => ({
    ...category,
    href: getAdminCategoryRoute(category.id),
    textValue: category.name
  }))

  return (
    <Grid
      aria-label={t('category.list.ariaLabel')}
      items={categoryGridItems}
      renderEmptyState={() => <p>{t('category.list.empty')}</p>}
      renderItem={renderCategoryItem}
      style={categoryListStyle}
    />
  )
}
