'use client'

import { ListBox, ListBoxItem } from 'react-aria-components'

import { adminNavItems } from '@/features/admin/admin-nav'
import { t } from '@/infrastructure/i18n'
import { Card, CardBody, CardFooter, CardTitle } from '@/presentation/components/ui/card'

import './admin-page.sass'

export const AdminPage: React.FC = () => (
  <ListBox
    aria-label={t('admin.nav.listAriaLabel')}
    className='admin-list'
    items={adminNavItems}
    orientation='horizontal'
  >
    {({ Icon, textValue, ...item }) => (
      <ListBoxItem {...item} className='item' textValue={textValue}>
        <Card>
          <CardBody>{Icon}</CardBody>

          <CardFooter>
            <CardTitle>{textValue}</CardTitle>
          </CardFooter>
        </Card>
      </ListBoxItem>
    )}
  </ListBox>
)
