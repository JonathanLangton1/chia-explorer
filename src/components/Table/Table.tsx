import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, flexRender, type SortingState } from '@tanstack/react-table'
import { ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from 'react-feather';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState } from 'react';
import * as React from 'react';


interface transactionData {
  txnHash: string
  type: string
  age: number
  block: number
  from: string
  direction: string
  to: string
  value: number
}

interface columns {
  header: string
  accessorKey: string
  cell?: (props: {getValue: () => any}) => any
}

function Table({ data, columns, resultName='results'}: { data: transactionData[], columns: columns[], resultName: string}) {
  const [sorting, setSorting] = useState<SortingState>([{desc: true, id: "age"}])

  const [animationParent] = useAutoAnimate()

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    enableSorting: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  })

  return (
    <div className='relative max-w-full'>
      {/* Total results */}
      <div className='px-6 py-6 text-sm'>
        <p>Latest {JSON.stringify(table.getState().pagination.pageSize)} from a total of <span className='text-green-600'>{data.length.toLocaleString()}</span> {resultName}</p>
      </div>

      <div className='overflow-x-auto'>
        <table className="min-w-full text-left">
          <thead className="border-b font-medium dark:border-neutral-500">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="whitespace-nowrap">
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} colSpan={header.colSpan} className="px-6 py-2 text-sm md:text-base">
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {/* {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null} */}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody ref={animationParent}>
            {table.getRowModel().rows.map(row => {
              return (
                <tr key={row.id} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id} className="whitespace-nowrap px-6 py-4 md:py-4 text-sm md:text-base">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex py-4 items-center">

        {/* Page navigation buttons */}
        <button className="disabled:opacity-30 transition" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
          <ChevronsLeft />
        </button>

        <button className="disabled:opacity-30 transition" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <ChevronLeft />
        </button>

        <button className="disabled:opacity-30 transition" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <ChevronRight />
        </button>

        <button className="disabled:opacity-30 transition" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
          <ChevronsRight />
        </button>

        {/* Page x of x indicator */}
        <span className='pl-8 whitespace-nowrap'>
          Page
          <span className='text-green-600 font-bold pl-1'>{table.getState().pagination.pageIndex + 1}</span> of {table.getPageCount()}
        </span>

        {/* Go to page input */}
        <span className="px-8 flex items-center whitespace-nowrap">
          Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border-2 border-gray-300 rounded-md bg-transparent pl-2 w-12 ml-2"
          />
        </span>

        {/* Change number of transactions per page */}
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>

      </div>
    </div>
  )
}

// Code for filter boxes on columns if needed

// function Filter({
//   column,
//   table,
// }: {
//   column: Column<any, any>
//   table: ReactTable<any>
// }) {
//   const firstValue = table
//     .getPreFilteredRowModel()
//     .flatRows[0]?.getValue(column.id)

//   const columnFilterValue = column.getFilterValue()

//   return typeof firstValue === 'number' ? (
//     <div className="flex space-x-2">
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[0] ?? ''}
//         onChange={e =>
//           column.setFilterValue((old: [number, number]) => [
//             e.target.value,
//             old?.[1],
//           ])
//         }
//         placeholder={`Min`}
//         className="w-24 border rounded"
//       />
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[1] ?? ''}
//         onChange={e =>
//           column.setFilterValue((old: [number, number]) => [
//             old?.[0],
//             e.target.value,
//           ])
//         }
//         placeholder={`Max`}
//         className="w-24 border rounded"
//       />
//     </div>
//   ) : (
//     <input
//       type="text"
//       value={(columnFilterValue ?? '') as string}
//       onChange={e => column.setFilterValue(e.target.value)}
//       placeholder={`Search...`}
//       className="border-2 border-gray-300 rounded-md bg-transparent pl-2 ml-2"
//     />
//   )
// }

export default Table