import { GridList, GridListItem, type GridListItemProps, type GridListProps } from 'react-aria-components'

import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './grid.sass'

export type GridItem<Data extends object> = GridListItemProps<Data> & Data

type GridProps<Data extends object> = Omit<GridListProps<Data>, 'children' | 'items'> & {
  items: GridItem<Data>[]
  renderItem?: (item: GridItem<Data>) => React.ReactNode
}

export function Grid <Data extends object> ({
  className,
  layout = 'grid',
  renderItem,
  ...gridRestProps
}: GridProps<Data>) {
  return (
    <GridList
      {...gridRestProps}
      className={values => reactAriaClassNames(values, className, 'grid')}
      layout={layout}
    >
      {item => (
        <GridListItem
          {...item}
          className={values => reactAriaClassNames(values, item.className, 'grid-item')}
        >
          {renderItem?.(item)}
        </GridListItem>
      )}
    </GridList>
  )
}
