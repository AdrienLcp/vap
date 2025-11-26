export const ADDRESS_API_BASE_URL = 'addresses'

export const ADDRESS_FORM_FIELDS = {
  CITY: 'city',
  COUNTRY: 'country',
  IS_DEFAULT: 'is-default',
  NAME: 'name',
  POSTAL_CODE: 'postal-code',
  STREET: 'street'
} as const

export const ADDRESS_ERRORS = {
  INVALID_CITY: 'INVALID_CITY',
  INVALID_COUNTRY: 'INVALID_COUNTRY',
  INVALID_NAME: 'INVALID_NAME',
  INVALID_POSTAL_CODE: 'INVALID_POSTAL_CODE',
  INVALID_STREET: 'INVALID_STREET'
}
