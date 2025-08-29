import { t } from '@/infrastructure/i18n'
import { PRODUCT_CONSTANTS, PRODUCT_ERRORS, PRODUCT_FORM_FIELDS } from '@/product/domain/product-constants'
import type { ProductConflictError, ProductValidationErrors } from '@/product/domain/product-entities'
import type { Issues } from '@/utils/validation-utils'

export const getBadRequestProductFormErrors = (issues: Issues): ProductValidationErrors => {
  const formErrors: string[] = []
  const nameErrors: string[] = []
  const skuErrors: string[] = []
  const priceErrors: string[] = []
  const discountedPriceErrors: string[] = []
  const stockErrors: string[] = []
  const descriptionErrors: string[] = []
  const imageUrlErrors: string[] = []

  for (const issue of issues) {
    switch (issue.message) {
      case PRODUCT_ERRORS.DESCRIPTION_TOO_LONG:
        descriptionErrors.push(t('product.fields.description.errors.tooLong', { max: PRODUCT_CONSTANTS.DESCRIPTION_MAX_LENGTH }))
        break
      case PRODUCT_ERRORS.DISCOUNTED_PRICE_TOO_HIGH:
        discountedPriceErrors.push(t('product.fields.discountedPrice.errors.tooHigh', { max: PRODUCT_CONSTANTS.MAX_PRICE }))
        break
      case PRODUCT_ERRORS.DISCOUNTED_PRICE_TOO_LOW:
        discountedPriceErrors.push(t('product.fields.discountedPrice.errors.tooLow', { min: PRODUCT_CONSTANTS.MIN_PRICE }))
      case PRODUCT_ERRORS.IMAGE_URL_INVALID:
        imageUrlErrors.push(t('product.fields.imageUrl.errors.invalidUrl'))
        break
      case PRODUCT_ERRORS.NAME_REQUIRED:
        nameErrors.push(t('product.fields.name.errors.required'))
        break
      case PRODUCT_ERRORS.NAME_TOO_LONG:
        nameErrors.push(t('product.fields.name.errors.tooLong', { max: PRODUCT_CONSTANTS.NAME_MAX_LENGTH }))
        break
      case PRODUCT_ERRORS.PRICE_TOO_HIGH:
        priceErrors.push(t('product.fields.price.errors.tooHigh', { max: PRODUCT_CONSTANTS.MAX_PRICE }))
        break
      case PRODUCT_ERRORS.PRICE_TOO_LOW:
        priceErrors.push(t('product.fields.price.errors.tooLow', { min: PRODUCT_CONSTANTS.MIN_PRICE }))
        break
      case PRODUCT_ERRORS.SKU_REQUIRED:
        skuErrors.push(t('product.fields.sku.errors.required'))
        break
      case PRODUCT_ERRORS.SKU_TOO_LONG:
        skuErrors.push(t('product.fields.sku.errors.tooLong', { max: PRODUCT_CONSTANTS.SKU_MAX_LENGTH }))
        break
      case PRODUCT_ERRORS.STOCK_TOO_LOW:
        stockErrors.push(t('product.fields.stock.errors.tooLow', { min: PRODUCT_CONSTANTS.MIN_STOCK }))
        break
      default:
        console.error('Unhandled bad request product validation error:', issue)
        formErrors.push(t('product.unknownError'))
    }
  }

  return {
    form: formErrors,
    [PRODUCT_FORM_FIELDS.NAME]: nameErrors,
    [PRODUCT_FORM_FIELDS.SKU]: skuErrors,
    [PRODUCT_FORM_FIELDS.PRICE]: priceErrors,
    [PRODUCT_FORM_FIELDS.DISCOUNTED_PRICE]: discountedPriceErrors,
    [PRODUCT_FORM_FIELDS.STOCK]: stockErrors,
    [PRODUCT_FORM_FIELDS.DESCRIPTION]: descriptionErrors,
    [PRODUCT_FORM_FIELDS.IMAGE_URL]: imageUrlErrors
  }
}

export const getConflictProductFormErrors = (conflictError: ProductConflictError): ProductValidationErrors => {
  switch (conflictError) {
    case 'PRODUCT_SKU_ALREADY_EXISTS':
      return { [PRODUCT_FORM_FIELDS.SKU]: t('product.fields.sku.errors.alreadyExists') }
    default:
      console.error('Unhandled conflict product validation error:', conflictError)
      return { form: t('product.unknownError') }
  }
}
