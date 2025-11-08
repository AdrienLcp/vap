import { CheckIcon, ChevronDown } from 'lucide-react'
import {
  type Key,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  Popover,
  Select as ReactAriaSelect,
  type SelectProps as ReactAriaSelectProps,
  SelectValue
} from 'react-aria-components'

import { t } from '@/infrastructure/i18n'
import { Label } from '@/presentation/components/ui/label'
import { Button } from '@/presentation/components/ui/pressables/button'
import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './select.sass'

type BaseSelectItem<K extends Key = string> = {
  Icon?: React.ReactElement
  id: K
}

export type SelectItem<K extends Key = string> = Omit<ListBoxItemProps<BaseSelectItem<K>>, 'id'> &
  BaseSelectItem<K>

export type SelectProps<K extends Key = string> = ReactAriaSelectProps<SelectItem<K>> & {
  items: SelectItem<K>[]
  label: string
}

export function Select<K extends Key = string>({
  className,
  label,
  items,
  placeholder,
  ...selectRestProps
}: SelectProps<K>) {
  return (
    <ReactAriaSelect
      {...selectRestProps}
      className={(values) => reactAriaClassNames(values, className, 'select')}
      placeholder={placeholder}
    >
      {({ isRequired }) => (
        <>
          <Label>
            {label} {isRequired && t('components.forms.requiredFields.mark')}
          </Label>

          <Button className='trigger'>
            <SelectValue className='value'>
              {({ defaultChildren, isPlaceholder }) => {
                if (isPlaceholder) {
                  return placeholder ?? t('components.forms.select.defaultPlaceholder')
                }

                return defaultChildren
              }}
            </SelectValue>

            <ChevronDown aria-hidden />
          </Button>

          <Popover>
            <ListBox className='select-popover' items={items}>
              {({ className, Icon, textValue, ...selectItemRestProps }) => (
                <ListBoxItem
                  {...selectItemRestProps}
                  className={(values) => reactAriaClassNames(values, className, 'item')}
                  textValue={textValue}
                >
                  {({ isSelected }) => (
                    <>
                      <div className='content'>
                        {Icon && (
                          <span aria-hidden className='icon'>
                            {Icon}
                          </span>
                        )}

                        <span className='text'>{textValue}</span>
                      </div>

                      {isSelected && <CheckIcon aria-hidden className='check-icon' />}
                    </>
                  )}
                </ListBoxItem>
              )}
            </ListBox>
          </Popover>
        </>
      )}
    </ReactAriaSelect>
  )
}
