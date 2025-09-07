import { GridList, GridListItem, GridListItemProps, type GridListProps } from 'react-aria-components'

type GridItem<Data extends object> = GridListItemProps<Data>

type GridProps<Data extends object> = Omit<GridListProps<Data>, 'items'> & {
  items: GridItem<Data>[]
  renderItem: (item: Data) => React.ReactNode
}

export function Grid <Data extends object> ({
  renderItem,
  ...gridRestProps
}: GridProps<Data>) {
  return (
    <GridList {...gridRestProps}>
      {item => (
        <GridListItem {...item}>
          {renderItem(item)}
        </GridListItem>
      )}
    </GridList>
  )
}
