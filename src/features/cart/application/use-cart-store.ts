import { create } from 'zustand'

import type { CartItemDTO, CartProduct } from '@/features/cart/domain/cart-entities'

type CartStore = {
  addItem: (product: CartProduct, quantity?: number) => void
  clearStore: () => void
  getItemCount: () => number
  getProductQuantity: (productId: string) => number
  getTotalPrice: () => number
  items: Map<string, CartItemDTO>,
  removeItem: (productId: string) => void
  syncItems: (cartItems: CartItemDTO[]) => void
  updateQuantity: (productId: string, newQuantity: number) => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: new Map<string, CartItemDTO>(),

  addItem: (product: CartProduct, quantity = 1) => {
    set(state => {
      const newItems = new Map(state.items)
      const existingItem = newItems.get(product.id)

      if (!existingItem) {
        newItems.set(product.id, { product, quantity })
        return { items: newItems }
      }

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + quantity
      }

      newItems.set(product.id, updatedItem)

      return { items: newItems }
    })
  },

  clearStore: () => set({ items: new Map<string, CartItemDTO>() }),

  getItemCount: () => get().items.size,

  getProductQuantity: (productId: string) => {
    return get().items.get(productId)?.quantity ?? 0
  },

  getTotalPrice: () => {
    return Array.from(get().items.values())
      .reduce((total, item) => total + (item.product.price * item.quantity), 0)
  },

  removeItem: (productId: string) => {
    set(state => {
      const newItems = new Map(state.items)
      newItems.delete(productId)
      return { items: newItems }
    })
  },

  syncItems: (cartItems: CartItemDTO[]) => {
    set(() => {
      const newItems = new Map<string, CartItemDTO>()

      for (const item of cartItems) {
        newItems.set(item.product.id, {
          product: item.product,
          quantity: item.quantity
        })
      }

      return { items: newItems }
    })
  },

  updateQuantity: (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      get().removeItem(productId)
      return
    }

    set(state => {
      const newItems = new Map(state.items)
      const existingItem = newItems.get(productId)

      if (existingItem) {
        newItems.set(productId, {
          ...existingItem,
          quantity: newQuantity
        })
      }

      return { items: newItems }
    })
  }
}))
