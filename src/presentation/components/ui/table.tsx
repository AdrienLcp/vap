'use client'

import {
  Cell,
  Column,
  type ColumnProps,
  type Key,
  Table as ReactAriaTable,
  type TableProps as ReactAriaTableProps,
  Row,
  TableBody,
  type TableBodyProps,
  TableHeader
} from 'react-aria-components'

import './table.sass'

export type TableColumn <ColumnKey extends Key = string> = Omit<ColumnProps, 'className' | 'id'> & {
  className?: string
  id: ColumnKey
}

type TableProps <RowData extends object, ColumnKey extends Key = string> = ReactAriaTableProps & {
  columns: TableColumn<ColumnKey>[]
  renderCell: (row: RowData, column: TableColumn<ColumnKey>) => React.ReactNode
  renderEmptyState?: TableBodyProps<RowData>['renderEmptyState']
  rows: TableBodyProps<RowData>['items']
}

export function Table <RowData extends object, ColumnKey extends Key = string> ({
  columns,
  renderCell,
  renderEmptyState,
  rows,
  ...tableRestProps
}: TableProps<RowData, ColumnKey>) {
  return (
    <ReactAriaTable {...tableRestProps}>
      <TableHeader columns={columns}>
        {column => <Column {...column} />}
      </TableHeader>

      <TableBody items={rows} renderEmptyState={renderEmptyState}>
        {row => (
          <Row columns={columns}>
            {column => <Cell className={column.className}>{renderCell(row, column)}</Cell>}
          </Row>
        )}
      </TableBody>
    </ReactAriaTable>
  )
}
