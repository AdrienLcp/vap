import { locale } from '@/infrastructure/i18n'

export const defaultPriceFormatOptions: Intl.NumberFormatOptions = {
  currency: 'EUR',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  style: 'currency'
}

type FormatPriceOptions = {
  currency?: string
  locale?: string
  maximumFractionDigits?: number
  minimumFractionDigits?: number
}

/**
 * Formats a price according to local conventions
 * @param value - The price value to format
 * @param options - Additional formatting options
 * @returns The formatted price as a string
 */
export const formatPrice = (value: number, options?: FormatPriceOptions): string => {
  const formatOptions: FormatPriceOptions = {
    ...defaultPriceFormatOptions,
    ...options
  }

  return new Intl.NumberFormat(options?.locale ?? locale, formatOptions).format(value)
}
