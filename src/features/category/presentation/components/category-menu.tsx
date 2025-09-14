import { EyeIcon, MenuIcon, PenIcon, Trash2Icon } from 'lucide-react'
import { useCallback, useMemo } from 'react'

import { getAdminCategoryRoute } from '@/domain/navigation'
import type { CategoryDTO } from '@/features/category/domain/category-entities'
import { CategoryClient } from '@/features/category/infrastructure/category-client'
import { t } from '@/infrastructure/i18n'
import { Menu, type MenuItem } from '@/presentation/components/ui/menu'
import { Button } from '@/presentation/components/ui/pressables/button'
import { ToastService } from '@/presentation/services/toast-service'

import './category-menu.sass'

type CategoryMenuProps = {
  categoryId: string
  setCategoryList: React.Dispatch<React.SetStateAction<CategoryDTO[]>>
}

const CategoryMenuTrigger: React.FC = () => (
  <Button
    aria-label={t('category.card.menuAriaLabel')}
    className='category-menu-trigger'
    Icon={<MenuIcon />}
    variant='transparent'
  />
)

export const CategoryMenu: React.FC<CategoryMenuProps> = ({ categoryId, setCategoryList }) => {
  const deleteCategory = useCallback(async () => {
    const categoryDeletionResponse = await CategoryClient.deleteCategory(categoryId)

    if (categoryDeletionResponse.status !== 204) {
      ToastService.error(t('category.delete.error'))
      return
    }

    setCategoryList(prevCategoryList => prevCategoryList.filter(category => category.id !== categoryId))
    ToastService.success(t('category.delete.success'))
  }, [categoryId, setCategoryList])

  const categoryMenuItems: MenuItem[] = useMemo(() => [
    {
      href: getAdminCategoryRoute(categoryId),
      Icon: <EyeIcon />,
      id: 'view',
      textValue: t('category.card.showCategorySheet')
    },
    {
      href: getAdminCategoryRoute(categoryId),
      Icon: <PenIcon />,
      id: 'edit',
      textValue: t('category.card.edit')
    },
    {
      Icon: <Trash2Icon />,
      id: 'delete',
      onPress: deleteCategory,
      textValue: t('category.card.delete')
    }
  ], [categoryId, deleteCategory])

  return (
    <Menu
      items={categoryMenuItems}
      Trigger={<CategoryMenuTrigger />}
    />
  )
}
