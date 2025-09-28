import { MinusIcon, PlusIcon } from 'lucide-react'
import { useCallback, useMemo } from 'react'

import { Button } from '@/presentation/components/ui/pressables/button'
import { stopPropagationHandlers } from '@/presentation/utils/interactions-utils'

import './quantity-selector.sass'

type QuantitySelectorProps = {
  isDisabled?: boolean
  max?: number
  min?: number
  onQuantityChange: (newQuantity: number) => void
  quantity: number
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ isDisabled, max, min, onQuantityChange, quantity }) => {
  const isMax = useMemo(() => max != null && quantity >= max, [max, quantity])
  const isMin = useMemo(() => min != null && quantity <= min, [min, quantity])

  const onDecrement = useCallback(() => {
    if (!isMin) {
      onQuantityChange(quantity - 1)
    }
  }, [isMin, onQuantityChange, quantity])

  const onIncrement = useCallback(() => {
    if (!isMax) {
      onQuantityChange(quantity + 1)
    }
  }, [isMax, onQuantityChange, quantity])

  return (
    <div className='quantity-selector' {...stopPropagationHandlers}>
      <Button isDisabled={isDisabled || isMin} onPress={onDecrement}>
        <MinusIcon />
      </Button>

      <span>{quantity}</span>

      <Button isDisabled={isDisabled || isMax} onPress={onIncrement}>
        <PlusIcon />
      </Button>
    </div>
  )
}
