import { EyeIcon, MenuIcon, PenIcon, TrashIcon } from 'lucide-react'

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
  const productMenuItems: MenuItem[] = [
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
      Icon: <TrashIcon />,
      id: 'delete',
      textValue: t('product.card.delete')
    }
  ]

  return (
    <Menu
      items={productMenuItems}
      Trigger={<ProductMenuTrigger />}
    />
  )
}
