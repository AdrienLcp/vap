'use client'

import React from 'react'

import { CREATED_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import { ToastService } from '@/presentation/services/toast-service'
import { PRODUCT_FORM_FIELDS } from '@/product/domain/product-constants'
import type { ProductCreationData, ProductDTO, ProductStatus, ProductValidationErrors } from '@/product/domain/product-entities'
import { ProductClient } from '@/product/infrastructure/product-client'
import { ProductCategorySelect } from '@/product/presentation/components/product-category-select'
import { ProductDescriptionField } from '@/product/presentation/components/product-description-field'
import { ProductDiscountedPriceField } from '@/product/presentation/components/product-discounted-price-field'
import { ProductImagePreviewField } from '@/product/presentation/components/product-image-preview-field'
import { ProductNameField } from '@/product/presentation/components/product-name-field'
import { ProductPriceField } from '@/product/presentation/components/product-price-field'
import { ProductSkuField } from '@/product/presentation/components/product-sku-field'
import { ProductStatusSelect } from '@/product/presentation/components/product-status-select'
import { ProductStockField } from '@/product/presentation/components/product-stock-field'

export const ProductCreationForm: React.FC = () => {
  const [isProductCreationLoading, setIsProductCreationLoading] = React.useState<boolean>(false)
  const [productCreationFormErrors, setProductCreationFormErrors] = React.useState<ProductValidationErrors>(null)

  const onProductCreationSuccess = React.useCallback((createdProduct: ProductDTO) => {
    ToastService.success(t('product.creation.success', { productName: createdProduct.name }))
  }, [])

  const onProductCreationFormSubmit = React.useCallback(async (formData: FormData) => {
    setIsProductCreationLoading(true)
    setProductCreationFormErrors(null)

    const productCreationData: ProductCreationData = {
      categoryId: formData.get(PRODUCT_FORM_FIELDS.CATEGORY_ID) as string,
      description: formData.get(PRODUCT_FORM_FIELDS.DESCRIPTION) as string,
      discountedPrice: parseInt(formData.get(PRODUCT_FORM_FIELDS.DISCOUNTED_PRICE) as string),
      imageUrl: formData.get(PRODUCT_FORM_FIELDS.IMAGE_URL) as string,
      name: formData.get(PRODUCT_FORM_FIELDS.NAME) as string,
      price: parseInt(formData.get(PRODUCT_FORM_FIELDS.PRICE) as string),
      sku: formData.get(PRODUCT_FORM_FIELDS.SKU) as string,
      status: formData.get(PRODUCT_FORM_FIELDS.STATUS) as ProductStatus,
      stock: parseInt(formData.get(PRODUCT_FORM_FIELDS.STOCK) as string)
    }

    const productCreationResponse = await ProductClient.createProduct(productCreationData)

    setIsProductCreationLoading(false)

    switch (productCreationResponse.status) {
      case CREATED_STATUS:
        onProductCreationSuccess(productCreationResponse.data)
        break
      default:
        ToastService.error(t('product.creation.errors.unknown'))
    }
  }, [onProductCreationSuccess])

  return (
    <Form onSubmit={onProductCreationFormSubmit} validationErrors={productCreationFormErrors}>
      <FieldSet isDisabled={isProductCreationLoading}>
        <ProductNameField />

        <ProductDescriptionField />

        <ProductPriceField />

        <ProductImagePreviewField />

        <ProductDiscountedPriceField />

        <ProductSkuField />

        <ProductStockField />

        <ProductStatusSelect />

        <ProductCategorySelect items={[]} />
      </FieldSet>

      <FormError errors={productCreationFormErrors?.form} />

      <SubmitButton isPending={isProductCreationLoading}>
        {({ isPending }) => t(`product.creation.submit.${isPending ? 'creating' : 'label'}`)}
      </SubmitButton>
    </Form>
  )
}
