import { useState } from 'react'

import { t } from '@/infrastructure/i18n'
import { SearchField } from '@/presentation/components/forms/search-field'
import { useDebounceCallback } from '@/presentation/hooks/use-debounce'

type PublicProductsSearchProps = {
  isLoadingProducts: boolean
  onSearchFilterChange: (search: string) => void
  searchFilter: string
}

export const PublicProductsSearch: React.FC<PublicProductsSearchProps> = ({
  isLoadingProducts,
  onSearchFilterChange,
  searchFilter
}) => {
  const [productSearch, setProductSearch] = useState<string>(searchFilter)

  useDebounceCallback(productSearch, onSearchFilterChange)

  return (
    <SearchField
      isDisabled={isLoadingProducts}
      label={t('product.filters.search.label')}
      onChange={setProductSearch}
      placeholder={t('product.filters.search.placeholder')}
      value={productSearch}
    />
  )
}
