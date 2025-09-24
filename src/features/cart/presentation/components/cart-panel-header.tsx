import { XIcon } from 'lucide-react'
import { Heading } from 'react-aria-components'

import { t } from '@/infrastructure/i18n'
import { Button } from '@/presentation/components/ui/pressables/button'

import './cart-panel-header.sass'

export const CartPanelHeader: React.FC = () => (
  <header className='cart-panel-header'>
    <Heading className='cart-title' slot='title'>
      {t('cart.title')}
    </Heading>

    <Button
      Icon={<XIcon />}
      slot='close'
      variant='transparent'
    />
  </header>
)
