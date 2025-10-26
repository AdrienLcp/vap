import {
  Cell,
  Column,
  type ColumnProps,
  type Key,
  Table as ReactAriaTable,
  type TableProps as ReactAriaTableProps,
  Row,
  type RowProps,
  TableBody,
  type TableBodyProps,
  TableHeader
} from 'react-aria-components'

import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './table.sass'

export type TableRow<RowData extends object> = Omit<
  RowProps<RowData>,
  'children' | 'columns' | 'id'
> & { id: string; item: RowData }

export type TableColumn<ColumnKey extends Key = string> = Omit<ColumnProps, 'className' | 'id'> & {
  className?: string
  id: ColumnKey
}

type TableProps<RowData extends object, ColumnKey extends Key = string> = ReactAriaTableProps & {
  columns: TableColumn<ColumnKey>[]
  renderCell: (row: RowData, column: TableColumn<ColumnKey>) => React.ReactNode
  renderEmptyState?: TableBodyProps<RowData>['renderEmptyState']
  rows: TableRow<RowData>[]
}

export function Table<RowData extends object, ColumnKey extends Key = string>({
  columns,
  renderCell,
  renderEmptyState,
  rows,
  ...tableRestProps
}: TableProps<RowData, ColumnKey>) {
  return (
    <ReactAriaTable {...tableRestProps}>
      <TableHeader columns={columns}>{(column) => <Column {...column} />}</TableHeader>

      <TableBody items={rows} renderEmptyState={renderEmptyState}>
        {({ item, value: _value, ...row }) => (
          <Row
            {...row}
            className={(values) => reactAriaClassNames(values, row.className, 'table-row')}
            columns={columns}
          >
            {(column) => <Cell className={column.className}>{renderCell(item, column)}</Cell>}
          </Row>
        )}
      </TableBody>
    </ReactAriaTable>
  )
}
