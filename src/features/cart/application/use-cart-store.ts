import { create } from 'zustand'

import type { CartItemDTO } from '@/features/cart/domain/cart-entities'

type CartStore = {
  addItem: (productId: CartItemDTO, quantity?: number) => void
  isLoading: boolean
  items: Map<string, CartItemDTO>
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: new Map<string, CartItemDTO>(),
  isLoading: false,

  addItem: async (product: CartItemDTO, quantity = 1) => {
    set({ isLoading: true })

    const items = get().items
    const existingItem = items.get(product.id)

    if (existingItem) {
      existingItem.quantity += quantity
      items.set(product.id, existingItem)
    } else {
      items.set(product.id, { ...product, quantity })
    }
  }
}))
