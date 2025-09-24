'use client'

import { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogTrigger, Modal, ModalOverlay } from 'react-aria-components'

import type { CartItemDTO } from '@/features/cart/domain/cart-entities'
import { CartClient } from '@/features/cart/infrastructure/cart-client'
import { CartButton } from '@/features/cart/presentation/components/cart-button'
import { CartPanel } from '@/features/cart/presentation/components/cart-panel'
import { t } from '@/infrastructure/i18n'
import { Spinner } from '@/presentation/components/ui/loaders/spinner'
import { ToastService } from '@/presentation/services/toast-service'

import './cart.sass'

export const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemDTO[]>([])
  const [isLoadingCart, setIsLoadingCart] = useState(true)

  const loadUserCart = useCallback(async () => {
    setIsLoadingCart(true)
    const cartResponse = await CartClient.findUserCartItems()
    setIsLoadingCart(false)

    if (cartResponse.status === 200) {
      setCartItems(cartResponse.data)
      return
    }

    setCartItems([])
    ToastService.error(t('cart.list.error'))
  }, [])

  useEffect(() => {
    loadUserCart()
  }, [loadUserCart])

  if (isLoadingCart) {
    return <Spinner />
  }

  return (
    <DialogTrigger>
      <CartButton itemCount={cartItems.length}  />

      <ModalOverlay className='cart-overlay' isDismissable>
        <Modal className='cart-modal'>
          <Dialog>
            <CartPanel items={cartItems} />
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
}
