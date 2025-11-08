import { useQueryState } from 'nuqs'

import { PRODUCT_SEARCH_PARAMS } from '@/features/product/domain/product-constants'
import { t } from '@/infrastructure/i18n'
import { SearchField } from '@/presentation/components/forms/search-field'
import { useDebounceCallback } from '@/presentation/hooks/use-debounce'

type PublicProductsSearchProps = {
  isLoadingProducts: boolean
  onSearchChange: (search: string) => void
}

export const PublicProductsSearch: React.FC<PublicProductsSearchProps> = ({
  isLoadingProducts,
  onSearchChange
}) => {
  const [productSearch, setProductSearch] = useQueryState(PRODUCT_SEARCH_PARAMS.SEARCH, {
    defaultValue: ''
  })

  useDebounceCallback(productSearch, onSearchChange)

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
