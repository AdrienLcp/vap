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
      <Button
        isDisabled={isDisabled}
        onPress={onPress}
        size='small'
        variant='underlined'
      >
        {makeDefaultMessage}
      </Button>
    )
  }

  return <span className='default-label'>{isDefaultMessage}</span>
}
