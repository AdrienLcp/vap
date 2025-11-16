import { create } from 'zustand'

import type { CartItemDTO, CartProduct } from '@/features/cart/domain/cart-entities'
import { LocaleStorage } from '@/infrastructure/storage/local-storage'

type CartStore = {
  addItem: (product: CartProduct, quantity?: number) => void
  clearStore: () => void
  getItemCount: () => number
  getProductQuantity: (productId: string) => number
  getTotalPrice: () => number
  items: Map<string, CartItemDTO>
  removeItem: (productId: string) => void
  syncItems: (cartItems?: CartItemDTO[]) => void
  updateQuantity: (productId: string, newQuantity: number) => void
}

const persistCartToLocal = (items: Map<string, CartItemDTO>) => {
  const itemsArray = Array.from(items.values())
  LocaleStorage.set('cart', itemsArray)
}

export const useCartStore = create<CartStore>((set, get) => ({
  addItem: (product: CartProduct, quantity = 1) => {
    set((state) => {
      const newItems = new Map(state.items)
      const existingItem = newItems.get(product.id)

      if (!existingItem) {
        newItems.set(product.id, { product, quantity })
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + quantity
        }
        newItems.set(product.id, updatedItem)
      }

      persistCartToLocal(newItems)
      return { items: newItems }
    })
  },

  clearStore: () => {
    LocaleStorage.remove('cart')
    set({ items: new Map<string, CartItemDTO>() })
  },

  getItemCount: () => get().items.size,

  getProductQuantity: (productId: string) => {
    return get().items.get(productId)?.quantity ?? 0
  },

  getTotalPrice: () => {
    return Array.from(get().items.values()).reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  },

  items: new Map<string, CartItemDTO>(),

  removeItem: (productId: string) => {
    set((state) => {
      const newItems = new Map(state.items)
      newItems.delete(productId)
      persistCartToLocal(newItems)
      return { items: newItems }
    })
  },

  syncItems: (cartItems?: CartItemDTO[]) => {
    const mergedMap = new Map<string, CartItemDTO>()

    if (cartItems) {
      for (const item of cartItems) {
        mergedMap.set(item.product.id, item)
      }
    }

    const localItems = LocaleStorage.find('cart')

    if (localItems) {
      for (const localItem of localItems) {
        const existingItem = mergedMap.get(localItem.product.id)

        if (!existingItem) {
          mergedMap.set(localItem.product.id, localItem)
        } else {
          const mergedQuantity = Math.max(existingItem.quantity, localItem.quantity)
          mergedMap.set(localItem.product.id, {
            ...existingItem,
            quantity: mergedQuantity
          })
        }
      }
    }

    persistCartToLocal(mergedMap)
    set({ items: mergedMap })
  },

  updateQuantity: (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      get().removeItem(productId)
      return
    }

    set((state) => {
      const newItems = new Map(state.items)
      const existingItem = newItems.get(productId)

      if (existingItem) {
        newItems.set(productId, {
          ...existingItem,
          quantity: newQuantity
        })
      }

      persistCartToLocal(newItems)
      return { items: newItems }
    })
  }
}))
