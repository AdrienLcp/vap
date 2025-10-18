import { XIcon } from 'lucide-react'
import { Heading } from 'react-aria-components'

import { useCartStore } from '@/features/cart/application/use-cart-store'
import { t } from '@/infrastructure/i18n'
import { Button } from '@/presentation/components/ui/pressables/button'

import './cart-panel-header.sass'

export const CartPanelHeader: React.FC = () => {
  const cartItemCount = useCartStore(state => state.getItemCount())

  return (
    <header className='cart-panel-header'>
      <Heading className='cart-title' slot='title'>
        {t('cart.title', { itemCount: cartItemCount })}
      </Heading>

      <Button
        Icon={<XIcon aria-hidden />}
        slot='close'
        variant='transparent'
      />
    </header>
  )
}
