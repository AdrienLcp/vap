import classNames from 'classnames'
import { XIcon } from 'lucide-react'
import { Dialog, DialogTrigger, Modal } from 'react-aria-components'

import { CartButton } from '@/features/cart/presentation/components/cart-button'
import { Button } from '@/presentation/components/ui/pressables/button'

import './cart.sass'

const itemCount = 0

export const Cart: React.FC = () => (
  <DialogTrigger>
    <CartButton itemCount={itemCount}  />

    <Modal className='cart-modal'>
      {({ isEntering, isExiting }) => (
        <Dialog>
          {({ close }) => (
            <aside className={classNames('cart-panel', isEntering && 'entering', isExiting && 'exiting')}>
              <Button
                Icon={<XIcon />}
                onPress={close}
                variant='transparent'
              />
            </aside>
          )}
        </Dialog>
      )}
    </Modal>
  </DialogTrigger>
)
