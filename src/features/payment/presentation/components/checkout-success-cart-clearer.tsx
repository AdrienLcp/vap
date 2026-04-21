'use client'

import { useEffect } from 'react'

import { useCartStore } from '@/features/cart/application/use-cart-store'

export const CheckoutSuccessCartClearer: React.FC = () => {
  const clearStore = useCartStore((state) => state.clearStore)

  useEffect(() => {
    clearStore()
  }, [clearStore])

  return null
}
