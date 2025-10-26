'use client'

import { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogTrigger, Modal, ModalOverlay } from 'react-aria-components'

import { useCartStore } from '@/features/cart/application/use-cart-store'
import { CartClient } from '@/features/cart/infrastructure/cart-client'
import { CartButton } from '@/features/cart/presentation/components/cart-button'
import { CartItemList } from '@/features/cart/presentation/components/cart-item-list'
import { CartPanelFooter } from '@/features/cart/presentation/components/cart-panel-footer'
import { CartPanelHeader } from '@/features/cart/presentation/components/cart-panel-header'
import { OK_STATUS, UNAUTHORIZED_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Spinner } from '@/presentation/components/ui/loaders/spinner'
import { ToastService } from '@/presentation/services/toast-service'

import './cart.sass'

export const Cart: React.FC = () => {
  const [isLoadingCart, setIsLoadingCart] = useState(true)

  const syncCartStore = useCartStore((state) => state.syncItems)

  const loadUserCart = useCallback(async () => {
    setIsLoadingCart(true)
    const cartResponse = await CartClient.findUserCartItems()
    setIsLoadingCart(false)

    if (cartResponse.status !== OK_STATUS) {
      if (cartResponse.status !== UNAUTHORIZED_STATUS) {
        ToastService.error(t('cart.list.error'))
      }
      return
    }

    syncCartStore(cartResponse.data)
  }, [syncCartStore])

  useEffect(() => {
    loadUserCart()
  }, [loadUserCart])

  if (isLoadingCart) {
    return <Spinner />
  }

  return (
    <DialogTrigger>
      <CartButton />

      <ModalOverlay className='cart-overlay' isDismissable>
        <Modal className='cart-modal'>
          <Dialog className='cart-panel'>
            <CartPanelHeader />

            <CartItemList />

            <CartPanelFooter />
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
}
