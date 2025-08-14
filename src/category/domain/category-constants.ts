export const CATEGORY_CONSTANTS = {
  DESCRIPTION_MAX_LENGTH: 500,
  NAME_MAX_LENGTH: 100,
  IMAGE_URL_MAX_LENGTH: 2048,

  NAME_ALREADY_EXISTS: 'CATEGORY_NAME_ALREADY_EXISTS'
} as const

export const CATEGORY_FORM_FIELDS = {
  NAME: 'category-name',
  DESCRIPTION: 'category-description',
  IMAGE_URL: 'category-image-url'
} as const
