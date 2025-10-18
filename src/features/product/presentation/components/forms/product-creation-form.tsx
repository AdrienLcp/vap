'use client'

import { SaveIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useCallback, useState } from 'react'

import { getAdminProductRoute } from '@/domain/navigation'
import type { CategoryDTO } from '@/features/category/domain/category-entities'
import { PRODUCT_FORM_FIELDS } from '@/features/product/domain/product-constants'
import type { ProductDTO, ProductValidationErrors } from '@/features/product/domain/product-entities'
import { ProductCreationSchema } from '@/features/product/domain/product-schemas'
import { ProductClient } from '@/features/product/infrastructure/product-client'
import { ProductCategorySelect } from '@/features/product/presentation/components/forms/product-category-select'
import { ProductDescriptionField } from '@/features/product/presentation/components/forms/product-description-field'
import { ProductDiscountedPriceField } from '@/features/product/presentation/components/forms/product-discounted-price-field'
import { ProductImagePreviewField } from '@/features/product/presentation/components/forms/product-image-preview-field'
import { ProductNameField } from '@/features/product/presentation/components/forms/product-name-field'
import { ProductPriceField } from '@/features/product/presentation/components/forms/product-price-field'
import { ProductSkuField } from '@/features/product/presentation/components/forms/product-sku-field'
import { ProductStatusSelect } from '@/features/product/presentation/components/forms/product-status-select'
import { ProductStockField } from '@/features/product/presentation/components/forms/product-stock-field'
import { getBadRequestProductFormErrors, getConflictProductFormErrors } from '@/features/product/presentation/validation/product-form-validation'
import { BAD_REQUEST_STATUS, CONFLICT_STATUS, CREATED_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { RequiredFieldsMessage } from '@/presentation/components/forms/required-fields-message'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import { ToastService } from '@/presentation/services/toast-service'

type ProductCreationFormProps = {
  categories: CategoryDTO[]
}

export const ProductCreationForm: React.FC<ProductCreationFormProps> = ({ categories }) => {
  const [isProductCreationLoading, setIsProductCreationLoading] = useState<boolean>(false)
  const [productCreationFormErrors, setProductCreationFormErrors] = useState<ProductValidationErrors>(null)

  const onProductCreationSuccess = useCallback((createdProduct: ProductDTO) => {
    ToastService.success(t('product.creation.success', { productName: createdProduct.name }))
    const createdProductRoute = getAdminProductRoute(createdProduct.id)
    redirect(createdProductRoute)
  }, [])

  const onProductCreationFormSubmit = useCallback(async (formData: FormData) => {
    setIsProductCreationLoading(true)
    setProductCreationFormErrors(null)

    const productCreationData = {
      categoryId: formData.get(PRODUCT_FORM_FIELDS.CATEGORY_ID),
      description: formData.get(PRODUCT_FORM_FIELDS.DESCRIPTION),
      discountedPrice: formData.get(PRODUCT_FORM_FIELDS.DISCOUNTED_PRICE),
      imageUrl: formData.get(PRODUCT_FORM_FIELDS.IMAGE_URL),
      name: formData.get(PRODUCT_FORM_FIELDS.NAME),
      price: formData.get(PRODUCT_FORM_FIELDS.PRICE),
      sku: formData.get(PRODUCT_FORM_FIELDS.SKU),
      status: formData.get(PRODUCT_FORM_FIELDS.STATUS),
      stock: formData.get(PRODUCT_FORM_FIELDS.STOCK)
    }

    const productCreationValidation = ProductCreationSchema.safeParse(productCreationData)

    if (!productCreationValidation.success) {
      setIsProductCreationLoading(false)
      setProductCreationFormErrors(getBadRequestProductFormErrors(productCreationValidation.error.issues))
      return
    }

    const productCreationResponse = await ProductClient.createProduct(productCreationValidation.data)
    setIsProductCreationLoading(false)

    switch (productCreationResponse.status) {
      case CREATED_STATUS:
        onProductCreationSuccess(productCreationResponse.data)
        break
      case BAD_REQUEST_STATUS:
        setProductCreationFormErrors(getBadRequestProductFormErrors(productCreationResponse.issues))
        break
      case CONFLICT_STATUS:
        setProductCreationFormErrors(getConflictProductFormErrors(productCreationResponse.error))
        break
      default:
        console.error('Unhandled product update response status:', productCreationResponse)
        ToastService.error(t('product.creation.unknownError'))
    }
  }, [onProductCreationSuccess])

  return (
    <Form onSubmit={onProductCreationFormSubmit} validationErrors={productCreationFormErrors}>
      <FieldSet isDisabled={isProductCreationLoading}>
        <ProductNameField />

        <ProductSkuField />

        <ProductPriceField />

        <ProductDiscountedPriceField />

        <ProductStockField />

        <ProductCategorySelect categories={categories} />

        <ProductStatusSelect />

        <ProductDescriptionField />

        <ProductImagePreviewField />
      </FieldSet>

      <FormError errors={productCreationFormErrors?.form} />

      <RequiredFieldsMessage />

      <SubmitButton Icon={<SaveIcon aria-hidden />} isPending={isProductCreationLoading}>
        {({ isPending }) => t(`product.creation.submit.${isPending ? 'creating' : 'label'}`)}
      </SubmitButton>
    </Form>
  )
}
