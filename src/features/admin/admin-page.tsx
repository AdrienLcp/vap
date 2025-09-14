'use client'

import { BoxIcon, ListIcon } from 'lucide-react'
import { ListBox, ListBoxItem, type ListBoxItemProps } from 'react-aria-components'

import { ROUTES } from '@/domain/navigation'
import { Card, CardBody, CardFooter, CardTitle } from '@/presentation/components/ui/card'

import './admin-page.sass'

type AdminItem = ListBoxItemProps & {
  Icon: React.ReactNode
}

const adminListBoxItems: AdminItem[] = [
  { href: ROUTES.adminProducts, Icon: <BoxIcon />, id: 'products', textValue: 'Produits' },
  { href: ROUTES.adminCategories, Icon: <ListIcon />, id: 'categories', textValue: 'Catégories' }
]

export const AdminPage: React.FC = () => (
  <ListBox className='admin-list' items={adminListBoxItems} orientation='horizontal'>
    {({ Icon, textValue, ...item }) => (
      <ListBoxItem {...item} className='item' textValue={textValue}>
        <Card>
          <CardBody>
            {Icon}
          </CardBody>

          <CardFooter>
            <CardTitle>{textValue}</CardTitle>
          </CardFooter>
        </Card>
      </ListBoxItem>
    )}
  </ListBox>
)
