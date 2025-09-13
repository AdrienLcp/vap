'use client'

import { Trash2Icon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useCallback } from 'react'

import { ROUTES } from '@/domain/navigation'
import { ProductClient } from '@/features/product/infrastructure/product-client'
import { t } from '@/infrastructure/i18n'
import { Button, type ButtonProps } from '@/presentation/components/ui/pressables/button'
import { ToastService } from '@/presentation/services/toast-service'

type ProductDeleteButtonProps = Partial<ButtonProps> & {
  productId: string
}

export const ProductDeleteButton: React.FC<ProductDeleteButtonProps> = ({ productId, ...productDeleteButtonRestProps }) => {
  const deleteProduct = useCallback(async () => {
    const deletedProductResponse = await ProductClient.deleteProduct(productId)

    if (deletedProductResponse.status !== 204) {
      ToastService.error(t('product.delete.error'))
      return
    }

    ToastService.success(t('product.delete.success'))
    redirect(ROUTES.adminProducts)
  }, [productId])

  return (
    <Button
      Icon={<Trash2Icon />}
      onPress={deleteProduct}
      variant='destructive'
      {...productDeleteButtonRestProps}
    >
      {t('product.delete.label')}
    </Button>
  )
}
