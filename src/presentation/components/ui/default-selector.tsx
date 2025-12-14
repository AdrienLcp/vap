'use client'

import { CheckIcon } from 'lucide-react'

import { Button } from '@/presentation/components/ui/pressables/button'
import { Tag } from '@/presentation/components/ui/tag'

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
      <Tag>
        <CheckIcon aria-hidden />

        {isDefaultMessage}
      </Tag>
    )
  }

  return (
    <Button
      className='default-selector-button'
      isDisabled={isDisabled}
      onPress={onPress}
      size='small'
      variant='underlined'
    >
      {makeDefaultMessage}
    </Button>
  )
}
