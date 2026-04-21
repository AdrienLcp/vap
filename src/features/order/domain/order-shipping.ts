export const SHIPPING_FLAT_RATE = 4.9

export const FREE_SHIPPING_THRESHOLD = 50

export const calculateShippingCost = (subtotal: number): number => {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0
  }
  return SHIPPING_FLAT_RATE
}
