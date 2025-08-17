import {
  type Key,
  type MenuItemProps,
  MenuTrigger,
  Popover,
  Menu as ReactAriaMenu,
  MenuItem as ReactAriaMenuItem,
  type MenuProps as ReactAriaMenuProps
} from 'react-aria-components'

import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './menu.sass'

export type MenuItem = Omit<MenuItemProps, 'id'> & {
  id: Key
  Icon?: React.ReactElement
}

type MenuProps<T> = ReactAriaMenuProps<T> & {
  items: MenuItem[]
  Trigger: React.ReactElement
}

export function Menu <T>({ Trigger, ...menuRestProps }: MenuProps<T>) {
  return (
    <MenuTrigger>
      {Trigger}

      <Popover>
        <ReactAriaMenu {...menuRestProps} className='menu'>
          {({ className, Icon, textValue, ...restItemProps }) => (
            <ReactAriaMenuItem
              className={values => reactAriaClassNames(values, className, 'item')}
              textValue={textValue}
              {...restItemProps}
            >
              {Icon && <span className='icon'>{Icon}</span>}

              <span className='text'>{textValue}</span>
            </ReactAriaMenuItem>
          )}
        </ReactAriaMenu>
      </Popover>
    </MenuTrigger>
  )
}
