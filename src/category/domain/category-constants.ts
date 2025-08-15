export const CATEGORY_CONSTANTS = {
  DESCRIPTION_MAX_LENGTH: 500,

  NAME_ALREADY_EXISTS: 'CATEGORY_NAME_ALREADY_EXISTS',
  NAME_MAX_LENGTH: 10,
  NAME_TOO_LONG: 'CATEGORY_NAME_TOO_LONG',

  IMAGE_URL_MAX_LENGTH: 2048
} as const

export const CATEGORY_FORM_FIELDS = {
  NAME: 'category-name',
  DESCRIPTION: 'category-description',
  IMAGE_URL: 'category-image-url'
} as const

export const CATEGORY_API_BASE_URL = 'categories'
