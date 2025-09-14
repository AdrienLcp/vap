import { EyeIcon, MenuIcon, PenIcon, Trash2Icon } from 'lucide-react'
import { useCallback, useMemo } from 'react'

import { getAdminProductRoute } from '@/domain/navigation'
import type { ProductDTO } from '@/features/product/domain/product-entities'
import { ProductClient } from '@/features/product/infrastructure/product-client'
import { t } from '@/infrastructure/i18n'
import { Menu, type MenuItem } from '@/presentation/components/ui/menu'
import { Button } from '@/presentation/components/ui/pressables/button'
import { ToastService } from '@/presentation/services/toast-service'

import './product-menu.sass'

type ProductMenuProps = {
  productId: string
  setProductList: React.Dispatch<React.SetStateAction<ProductDTO[]>>
}

const ProductMenuTrigger: React.FC = () => (
  <Button
    aria-label={t('product.card.menuAriaLabel')}
    className='product-menu-trigger'
    Icon={<MenuIcon />}
    variant='transparent'
  />
)

export const ProductMenu: React.FC<ProductMenuProps> = ({ productId, setProductList }) => {
  const deleteProduct = useCallback(async () => {
    const productDeletionResponse = await ProductClient.deleteProduct(productId)

    if (productDeletionResponse.status !== 204) {
      ToastService.error(t('product.delete.error'))
      return
    }

    setProductList(prevProductList => prevProductList.filter(product => product.id !== productId))
    ToastService.success(t('product.delete.success'))
  }, [productId, setProductList])

  const productMenuItems: MenuItem[] = useMemo(() => [
    {
      href: getAdminProductRoute(productId),
      Icon: <EyeIcon />,
      id: 'view',
      textValue: t('product.card.showProductSheet')
    },
    {
      href: getAdminProductRoute(productId),
      Icon: <PenIcon />,
      id: 'edit',
      textValue: t('product.card.edit')
    },
    {
      Icon: <Trash2Icon />,
      id: 'delete',
      onPress: deleteProduct,
      textValue: t('product.card.delete')
    }
  ], [deleteProduct, productId])

  return (
    <Menu
      items={productMenuItems}
      Trigger={<ProductMenuTrigger />}
    />
  )
}
