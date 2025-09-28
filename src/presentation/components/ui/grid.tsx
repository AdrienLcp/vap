'use client'

import { useCallback, useMemo } from 'react'
import { GridList, GridListItem, type GridListItemProps, type GridListItemRenderProps, type GridListProps, type GridListRenderProps } from 'react-aria-components'

import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'
import type { Style } from '@/presentation/utils/styles-utils'

import './grid.sass'

export type GridItem<Data extends object> = GridListItemProps<Data> & Data

type GridProps<Data extends object> = Omit<GridListProps<Data>, 'children' | 'items'> & {
  itemSize?: number
  items: GridItem<Data>[]
  renderItem?: (item: GridItem<Data>, values?: GridListItemRenderProps) => React.ReactNode
}

export function Grid <Data extends object> ({
  className,
  itemSize = 200,
  layout = 'grid',
  renderEmptyState,
  renderItem,
  style,
  ...gridRestProps
}: GridProps<Data>) {
  const gridStyle: Style = useMemo(() => ({
    '--grid-item-size': `${itemSize}px`,
    ...style
  }), [itemSize, style])

  const renderGridEmptyState = useCallback((gridListRenderProps: GridListRenderProps) => {
    if (!renderEmptyState) {
      return null
    }

    return (
      <div className='grid-empty-state'>
        {renderEmptyState(gridListRenderProps)}
      </div>
    )
  }, [renderEmptyState])

  return (
    <GridList
      {...gridRestProps}
      className={values => reactAriaClassNames(values, className, 'grid')}
      layout={layout}
      renderEmptyState={renderGridEmptyState}
      style={gridStyle}
    >
      {gridItem => (
        <GridListItem
          {...gridItem}
          className={values => reactAriaClassNames(values, gridItem.className, 'grid-item')}
        >
          {values => renderItem?.(gridItem, values)}
        </GridListItem>
      )}
    </GridList>
  )
}
