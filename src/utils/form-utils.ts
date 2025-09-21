export const getOptionalNumber = (value: FormDataEntryValue | null): number | undefined => {
  if (value && typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    return Number.isNaN(parsed) ? undefined : parsed
  }

  return undefined
}

export const getOptionalString = (value: FormDataEntryValue | null): string | undefined => {
  return value && typeof value === 'string' && value.trim() !== '' ? value : undefined
}

export const getRequiredNumber = (value: FormDataEntryValue | null, fallback: number): number => {
  if (value && typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    return Number.isNaN(parsed) ? fallback : parsed
  }

  return fallback
}

/**
 * Extracts a number from form data value with optional fallback
 * @param value Form data value to parse
 * @returns number or undefined if invalid and no fallback provided
 */
export function parseNumber(value: FormDataEntryValue | null): number | undefined

/**
 * Extracts a number from form data value with required fallback
 * @param value Form data value to parse
 * @param fallback Default value to use if parsing fails
 * @returns number (never undefined)
 */
export function parseNumber(value: FormDataEntryValue | null, fallback: number): number

// Implementation
export function parseNumber(value: FormDataEntryValue | null, fallback?: number): number | undefined {
  if (value && typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    if (!Number.isNaN(parsed)) {
      return parsed
    }
  }

  return fallback
}
