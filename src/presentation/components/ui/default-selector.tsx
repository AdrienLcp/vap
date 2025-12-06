'use client'

import { CheckIcon } from 'lucide-react'

import { Button } from '@/presentation/components/ui/pressables/button'

import './default-selector.sass'

type DefaultSelectorProps = {
  isDefault: boolean
  isDefaultMessage: string
  isDisabled: boolean
  makeDefaultMessage: string
  onPress: () => void
}

export const DefaultSelector: React.FC<DefaultSelectorProps> = ({
  isDefault,
  isDefaultMessage,
  isDisabled,
  makeDefaultMessage,
  onPress
}) => {
  if (isDefault) {
    return (
      <span className='default-selector'>
        <CheckIcon aria-hidden />

        {isDefaultMessage}
      </span>
    )
  }

  return (
    <Button isDisabled={isDisabled} onPress={onPress} size='small' variant='underlined'>
      {makeDefaultMessage}
    </Button>
  )
}
