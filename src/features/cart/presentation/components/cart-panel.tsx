import type { CartItemDTO } from '@/features/cart/domain/cart-entities'
import { CartPanelHeader } from '@/features/cart/presentation/components/cart-panel-header'

import './cart-panel.sass'

type CartPanelProps = {
  items: CartItemDTO[]
}

export const CartPanel: React.FC<CartPanelProps> = ({ items }) => (
  <aside className='cart-panel'>
    <CartPanelHeader />
  </aside>
)
