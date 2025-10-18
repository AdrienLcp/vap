import { EyeIcon, MenuIcon, PenIcon, Trash2Icon } from 'lucide-react'
import { useCallback, useMemo } from 'react'

import { getAdminProductRoute } from '@/domain/navigation'
import type { ProductDTO } from '@/features/product/domain/product-entities'
import { ProductClient } from '@/features/product/infrastructure/product-client'
import { NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
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
    Icon={<MenuIcon aria-hidden />}
    variant='transparent'
  />
)

export const ProductMenu: React.FC<ProductMenuProps> = ({ productId, setProductList }) => {
  const deleteProduct = useCallback(async () => {
    const productDeletionResponse = await ProductClient.deleteProduct(productId)

    if (productDeletionResponse.status !== NO_CONTENT_STATUS) {
      ToastService.error(t('product.delete.error'))
      return
    }

    setProductList(prevProductList => prevProductList.filter(product => product.id !== productId))
    ToastService.success(t('product.delete.success'))
  }, [productId, setProductList])

  const productMenuItems: MenuItem[] = useMemo(() => [
    {
      href: getAdminProductRoute(productId),
      Icon: <EyeIcon aria-hidden />,
      id: 'view',
      textValue: t('product.card.showProductSheet')
    },
    {
      href: getAdminProductRoute(productId),
      Icon: <PenIcon aria-hidden />,
      id: 'edit',
      textValue: t('product.card.edit')
    },
    {
      Icon: <Trash2Icon aria-hidden />,
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
