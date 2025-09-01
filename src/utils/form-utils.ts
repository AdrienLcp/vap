export const getOptionalNumber = (value: FormDataEntryValue | null): number | undefined => {
  if (value && typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    return isNaN(parsed) ? undefined : parsed
  }

  return undefined
}

export const getOptionalString = (value: FormDataEntryValue | null): string | undefined => {
  return value && typeof value === 'string' && value.trim() !== '' ? value : undefined
}

export const getRequiredNumber = (value: FormDataEntryValue | null, fallback = 0): number => {
  if (value && typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    return isNaN(parsed) ? fallback : parsed
  }

  return fallback
}
