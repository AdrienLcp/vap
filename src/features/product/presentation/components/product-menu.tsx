import { EyeIcon, MenuIcon, PenIcon, Trash2Icon } from 'lucide-react'
import { useMemo } from 'react'

import { getAdminProductRoute } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { Menu, type MenuItem } from '@/presentation/components/ui/menu'
import { Button } from '@/presentation/components/ui/pressables/button'

import './product-menu.sass'

type ProductMenuProps = {
  productId: string
}

const ProductMenuTrigger: React.FC = () => (
  <Button
    aria-label={t('product.card.menuAriaLabel')}
    className='product-menu-trigger'
    Icon={<MenuIcon />}
    variant='transparent'
  />
)

export const ProductMenu: React.FC<ProductMenuProps> = ({ productId }) => {
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
      textValue: t('product.card.delete')
    }
  ], [productId])

  return (
    <Menu
      items={productMenuItems}
      Trigger={<ProductMenuTrigger />}
    />
  )
}
