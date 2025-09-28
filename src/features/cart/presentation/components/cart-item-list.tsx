import { useCartStore } from '@/features/cart/application/use-cart-store'

export const CartItemList: React.FC = () => {
  const items = useCartStore(state => state.items)

  const itemList = Array.from(items.values())

  if (itemList.length === 0) {
    return <p>Your cart is empty.</p>
  }

  return itemList.map(item => (
    <div key={item.id}>
      <span>{item.name}</span>
      <span>Quantity: {item.quantity}</span>
      <span>Price: ${item.price}</span>
    </div>
  ))
}
