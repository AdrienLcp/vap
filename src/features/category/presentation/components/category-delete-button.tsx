'use client'

import { Trash2Icon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useCallback } from 'react'

import { ROUTES } from '@/domain/navigation'
import { CategoryClient } from '@/features/category/infrastructure/category-client'
import { NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Button, type ButtonProps } from '@/presentation/components/ui/pressables/button'
import { ToastService } from '@/presentation/services/toast-service'

type CategoryDeleteButtonProps = Partial<ButtonProps> & {
  categoryId: string
}

export const CategoryDeleteButton: React.FC<CategoryDeleteButtonProps> = ({ categoryId, ...categoryDeleteButtonRestProps }) => {
  const deleteCategory = useCallback(async () => {
    const categoryDeletionResponse = await CategoryClient.deleteCategory(categoryId)

    if (categoryDeletionResponse.status !== NO_CONTENT_STATUS) {
      ToastService.error(t('category.delete.error'))
      return
    }

    ToastService.success(t('category.delete.success'))
    redirect(ROUTES.adminCategories)
  }, [categoryId])

  return (
    <Button
      Icon={<Trash2Icon />}
      onPress={deleteCategory}
      variant='destructive'
      {...categoryDeleteButtonRestProps}
    >
      {t('category.delete.label')}
    </Button>
  )
}
