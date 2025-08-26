'use client'

import { useCallback, useState } from 'react'

import type { CategoryDTO } from '@/category/domain/category-entities'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import { ToastService } from '@/presentation/services/toast-service'
import { PRODUCT_FORM_FIELDS } from '@/product/domain/product-constants'
import type { ProductDTO, ProductStatus, ProductUpdateData, ProductValidationErrors } from '@/product/domain/product-entities'
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

type ProductUpdateFormProps = {
  categories: CategoryDTO[]
  product: ProductDTO
}

export const ProductUpdateForm: React.FC<ProductUpdateFormProps> = ({ categories, product }) => {
  const [isProductUpdateLoading, setIsProductUpdateLoading] = useState<boolean>(false)
  const [productUpdateFormErrors, setProductUpdateFormErrors] = useState<ProductValidationErrors>(null)

  const onProductUpdateSuccess = useCallback((updatedProduct: ProductDTO) => {
    ToastService.success(t('product.update.success', { productName: updatedProduct.name }))
  }, [])

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
        onProductUpdateSuccess(productUpdateResponse.data)
        break
      default:
        ToastService.error(t('product.update.errors.unknown'))
    }
  }, [onProductUpdateSuccess])

  return (
    <Form onSubmit={onProductUpdateFormSubmit} validationErrors={productUpdateFormErrors}>
      <FieldSet isDisabled={isProductUpdateLoading}>
        <ProductNameField defaultValue={product.name} />

        <ProductDescriptionField defaultValue={product.description ?? undefined} />

        <ProductPriceField defaultValue={product.price} />

        <ProductImagePreviewField imageUrl={product.imageUrl ?? undefined} />

        <ProductDiscountedPriceField defaultValue={product.discountedPrice ?? undefined} />

        <ProductSkuField defaultValue={product.sku} />

        <ProductStockField defaultValue={product.stock} />

        <ProductStatusSelect defaultSelectedKey={product.category?.id} />

        <ProductCategorySelect categories={categories} />
      </FieldSet>

      <FormError errors={productUpdateFormErrors?.form} />

      <SubmitButton isPending={isProductUpdateLoading}>
        {({ isPending }) => t(`product.update.submit.${isPending ? 'updating' : 'label'}`)}
      </SubmitButton>
    </Form>
  )
}
