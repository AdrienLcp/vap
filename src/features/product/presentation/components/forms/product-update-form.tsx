'use client'

import { SaveIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

import type { CategoryDTO } from '@/features/category/domain/category-entities'
import { PRODUCT_FORM_FIELDS } from '@/features/product/domain/product-constants'
import type { ProductDTO, ProductStatus, ProductUpdateData, ProductValidationErrors } from '@/features/product/domain/product-entities'
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
import { BAD_REQUEST_STATUS, CONFLICT_STATUS, OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import { ToastService } from '@/presentation/services/toast-service'

type ProductUpdateFormProps = {
  categories: CategoryDTO[]
  product: ProductDTO
}

export const ProductUpdateForm: React.FC<ProductUpdateFormProps> = ({ categories, product }) => {
  const [isProductUpdateLoading, setIsProductUpdateLoading] = useState<boolean>(false)
  const [productUpdateFormErrors, setProductUpdateFormErrors] = useState<ProductValidationErrors>(null)

  const onProductUpdateFormSubmit = useCallback(async (formData: FormData) => {
    setIsProductUpdateLoading(true)
    setProductUpdateFormErrors(null)

    const productUpdateData: ProductUpdateData = {
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

    const productUpdateResponse = await ProductClient.updateProduct(product.id, productUpdateData)

    setIsProductUpdateLoading(false)

    switch (productUpdateResponse.status) {
      case OK_STATUS:
        ToastService.success(t('product.update.success', { productName: productUpdateResponse.data.name }))
        break
      case BAD_REQUEST_STATUS:
        const badRequestProductFormErrors = getBadRequestProductFormErrors(productUpdateResponse.issues)
        setProductUpdateFormErrors(badRequestProductFormErrors)
        break
      case CONFLICT_STATUS:
        const conflictProductFormErrors = getConflictProductFormErrors(productUpdateResponse.error)
        setProductUpdateFormErrors(conflictProductFormErrors)
      default:
        console.error('Unhandled product update response status:', productUpdateResponse)
        ToastService.error(t('product.update.unknownError'))
    }
  }, [product.id])

  return (
    <Form onSubmit={onProductUpdateFormSubmit} validationErrors={productUpdateFormErrors}>
      <FieldSet isDisabled={isProductUpdateLoading}>
        <ProductNameField defaultValue={product.name} />

        <ProductSkuField defaultValue={product.sku} />

        <ProductPriceField defaultValue={product.price} />

        <ProductDiscountedPriceField defaultValue={product.discountedPrice} />

        <ProductStockField defaultValue={product.stock} />

        <ProductCategorySelect categories={categories} />

        <ProductStatusSelect defaultSelectedKey={product.category?.id} />

        <ProductDescriptionField defaultValue={product.description} />

        <ProductImagePreviewField imageUrl={product.imageUrl} />
      </FieldSet>

      <FormError errors={productUpdateFormErrors?.form} />

      <SubmitButton Icon={<SaveIcon />} isPending={isProductUpdateLoading}>
        {({ isPending }) => t(`product.update.submit.${isPending ? 'updating' : 'label'}`)}
      </SubmitButton>
    </Form>
  )
}
