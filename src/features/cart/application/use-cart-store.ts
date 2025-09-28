import { create } from 'zustand'

import type { CartProduct } from '@/features/cart/domain/cart-entities'

export type CartStoreItem = CartProduct & { quantity: number }

type CartStore = {
  addItem: (product: CartProduct, quantity?: number) => void
  clearStore: () => void
  getProductQuantity: (productId: string) => number
  getItemCount: () => number
  items: Map<string, CartStoreItem>,
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, newQuantity: number) => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: new Map<string, CartStoreItem>(),

  addItem: (product: CartProduct, quantity = 1) => {
    set(state => {
      const newItems = new Map(state.items)
      const existingItem = newItems.get(product.id)

      if (!existingItem) {
        newItems.set(product.id, { ...product, quantity })
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + quantity
        }
        newItems.set(product.id, updatedItem)
      }

      return { items: newItems }
    })
  },

  clearStore: () => set({ items: new Map<string, CartStoreItem>() }),

  getProductQuantity: (productId: string) => {
    return get().items.get(productId)?.quantity ?? 0
  },

  getItemCount: () => get().items.size,

  removeItem: (productId: string) => {
    set(state => {
      const newItems = new Map(state.items)
      newItems.delete(productId)
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
