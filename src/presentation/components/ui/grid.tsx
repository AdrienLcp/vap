'use client'

import { useMemo } from 'react'
import { GridList, GridListItem, type GridListItemProps, type GridListProps } from 'react-aria-components'

import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'
import type { Style } from '@/presentation/utils/styles-utils'

import './grid.sass'

export type GridItem<Data extends object> = GridListItemProps<Data> & Data

type GridProps<Data extends object> = Omit<GridListProps<Data>, 'children' | 'items'> & {
  cardSize?: number
  items: GridItem<Data>[]
  renderItem?: (item: GridItem<Data>) => React.ReactNode
}

export function Grid <Data extends object> ({
  className,
  cardSize = 200,
  layout = 'grid',
  renderItem,
  style,
  ...gridRestProps
}: GridProps<Data>) {
  const gridStyle: Style = useMemo(() => ({
    '--grid-card-size': `${cardSize}px`,
    ...style
  }), [cardSize, style])

  return (
    <GridList
      {...gridRestProps}
      className={values => reactAriaClassNames(values, className, 'grid')}
      layout={layout}
      style={gridStyle}
    >
      {gridItem => (
        <GridListItem
          {...gridItem}
          className={values => reactAriaClassNames(values, gridItem.className, 'grid-item')}
        >
          {renderItem?.(gridItem)}
        </GridListItem>
      )}
    </GridList>
  )
}
