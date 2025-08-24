import { ChevronDown } from 'lucide-react'
import {
  type Key,
  Label,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  Popover,
  Select as ReactAriaSelect,
  type SelectProps as ReactAriaSelectProps,
  SelectValue
} from 'react-aria-components'

import { Button } from '@/presentation/components/ui/pressables/button'
import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './select.sass'

type BaseSelectItem<K extends Key = string> = {
  Icon?: React.ReactElement
  id: K
}

export type SelectItem<K extends Key = string> = Omit<ListBoxItemProps<BaseSelectItem<K>>, 'id'> & BaseSelectItem<K>

export type SelectProps<K extends Key = string> = ReactAriaSelectProps<SelectItem<K>> & {
  items: SelectItem<K>[]
  label: string
}

export function Select <K extends Key = string> ({ className, label, items, ...selectRestProps }: SelectProps<K>) {
  return (
    <ReactAriaSelect
      {...selectRestProps}
      className={values => reactAriaClassNames(values, className, 'select')}
    >
      <Label>{label}</Label>

      <Button className='trigger'>
        <SelectValue />

        <ChevronDown aria-hidden />
      </Button>

      <Popover className='popover'>
        <ListBox items={items}>
          {({ className, Icon, textValue, ...selectItemRestProps }) => (
            <ListBoxItem
              className={values => reactAriaClassNames(values, className, 'item')}
              textValue={textValue}
              {...selectItemRestProps}
            >
              {Icon && <span aria-hidden className='icon'>{Icon}</span>}

              <span className='text'>{textValue}</span>
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </ReactAriaSelect>
  )
}
