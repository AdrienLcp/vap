import { parseAsInteger, useQueryState } from 'nuqs'
import { useCallback } from 'react'

import {
  PRODUCT_CONSTANTS,
  PRODUCT_SEARCH_PARAMS
} from '@/features/product/domain/product-constants'
import { t } from '@/infrastructure/i18n'
import { Slider } from '@/presentation/components/ui/slider'
import { useDebounceCallback } from '@/presentation/hooks/use-debounce'
import { priceFormatOptions } from '@/utils/format-utils'

import './product-price-filter.sass'

const filterMaxPrice = Math.ceil(PRODUCT_CONSTANTS.MAX_PRICE)
const filterMinPrice = Math.floor(PRODUCT_CONSTANTS.MIN_PRICE)

const priceFilterFormatOptions: Intl.NumberFormatOptions = {
  ...priceFormatOptions,
  maximumFractionDigits: 0,
  minimumFractionDigits: 0
}

type ProductPriceFilterProps = {
  isLoadingProducts: boolean
  onMaxPriceFilterChange: (maxPrice: number) => void
  onMinPriceFilterChange: (minPrice: number) => void
}

export const ProductPriceFilter: React.FC<ProductPriceFilterProps> = ({
  isLoadingProducts,
  onMaxPriceFilterChange,
  onMinPriceFilterChange
}) => {
  const [maxPriceFilter, setMaxPriceFilter] = useQueryState(
    PRODUCT_SEARCH_PARAMS.MAX_PRICE,
    parseAsInteger.withDefault(filterMaxPrice)
  )

  const [minPriceFilter, setMinPriceFilter] = useQueryState(
    PRODUCT_SEARCH_PARAMS.MIN_PRICE,
    parseAsInteger.withDefault(filterMinPrice)
  )

  useDebounceCallback(maxPriceFilter, onMaxPriceFilterChange)
  useDebounceCallback(minPriceFilter, onMinPriceFilterChange)

  const onProductPriceFilterChange = useCallback(
    (values: number | number[]) => {
      if (!Array.isArray(values)) return

      const newMaxPrice = values[1] ?? filterMaxPrice
      const newMinPrice = values[0] ?? filterMinPrice

      setMaxPriceFilter(newMaxPrice)
      setMinPriceFilter(newMinPrice)
    },
    [setMaxPriceFilter, setMinPriceFilter]
  )

  return (
    <Slider
      className='product-price-filter'
      defaultValue={[minPriceFilter, maxPriceFilter]}
      formatOptions={priceFilterFormatOptions}
      isDisabled={isLoadingProducts}
      label={t('product.filters.price.label')}
      maxValue={filterMaxPrice}
      minValue={filterMinPrice}
      onChange={onProductPriceFilterChange}
      step={5}
      thumbLabels={[
        t('product.filters.price.minPriceAriaLabel'),
        t('product.filters.price.maxPriceAriaLabel')
      ]}
    />
  )
}
