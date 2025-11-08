import { useCallback } from 'react'

import { PRODUCT_CONSTANTS } from '@/features/product/domain/product-constants'
import type {
  ProductFilters,
  ProductPriceFilters
} from '@/features/product/domain/product-entities'
import { ProductCategoryFilter } from '@/features/product/presentation/components/product-category-filter'
import { ProductPriceFilter } from '@/features/product/presentation/components/product-price-filter'
import { PublicProductsSearch } from '@/features/product/presentation/components/public-products-search'

import './public-products-filters.sass'

type PublicProductsFiltersProps = {
  filters: ProductFilters
  isLoadingProducts: boolean
  onFilterChange: (filters: ProductFilters) => void
}

export const PublicProductsFilters: React.FC<PublicProductsFiltersProps> = ({
  filters,
  isLoadingProducts,
  onFilterChange
}) => {
  const onCategoriesFilterChange = useCallback(
    (categoryIds: string[]) => {
      onFilterChange({ categoryIds })
    },
    [onFilterChange]
  )

  const onPriceFiltersChange = useCallback(
    ({ maxPrice, minPrice }: ProductPriceFilters) => {
      onFilterChange({ maxPrice, minPrice })
    },
    [onFilterChange]
  )

  const onSearchFilterChange = useCallback(
    (search: string) => {
      onFilterChange({ search })
    },
    [onFilterChange]
  )

  return (
    <div className='public-products-filters'>
      <PublicProductsSearch
        isLoadingProducts={isLoadingProducts}
        onSearchFilterChange={onSearchFilterChange}
        searchFilter={filters.search ?? ''}
      />

      <ProductCategoryFilter
        isLoadingProducts={isLoadingProducts}
        onCategoriesFilterChange={onCategoriesFilterChange}
        selectedCategoryIds={filters.categoryIds ?? []}
      />

      <ProductPriceFilter
        isLoadingProducts={isLoadingProducts}
        maxPriceFilter={filters.maxPrice ?? PRODUCT_CONSTANTS.MAX_PRICE}
        minPriceFilter={filters.minPrice ?? PRODUCT_CONSTANTS.MIN_PRICE}
        onPriceFiltersChange={onPriceFiltersChange}
      />
    </div>
  )
}
