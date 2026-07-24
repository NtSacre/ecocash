import type { ReactNode } from 'react'

export interface TableColumn<T> {
  header: string
  render: (row: T) => ReactNode
}

interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  rowKey: (row: T) => string | number
}

export function Table<T>({ columns, data, rowKey }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg bg-surface-container-lowest shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-outline-variant/20 bg-surface-container-low">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="whitespace-nowrap px-4 py-3 font-bold text-on-surface-variant">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={rowKey(row)} className="border-b border-outline-variant/10 last:border-0">
              {columns.map((col) => (
                <td key={col.header} className="whitespace-nowrap px-4 py-3 text-on-surface">
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}