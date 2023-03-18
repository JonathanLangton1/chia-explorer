import { ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from 'react-feather';
import type { Column, HeaderGroup, Row, TableInstance, TableState } from "react-table";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useTable, usePagination } from "react-table";

interface Props<T extends object> {
  data: T[];
  columns: readonly Column<T>[];
}

interface ExtendedTableInstance<T extends object> extends TableInstance<T> {
  canPreviousPage: boolean;
  canNextPage: boolean;
  page: Row<T>[];
  pageOptions: {
    pageIndex: number;
    pageSize: number;
  }[];
  pageCount: number;
  gotoPage: (pageIndex: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (number: number) => void;
  state: Partial<TableState<T>> & { pageIndex: number, pageSize: number };
}


function Table<T extends object>({ columns, data }: Props<T>) {
  const [animationParent] = useAutoAnimate()
  const tableInstance = useTable<T>({ columns, data, initialState: { pageIndex: 0, pageSize: 10 } as Partial<TableState<T>>}, usePagination) as ExtendedTableInstance<T>;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = tableInstance;


  return (
    <>
      <table {...getTableProps()} className="min-w-full text-left">
        <thead className="border-b font-medium dark:border-neutral-500">
          {headerGroups.map((headerGroup: HeaderGroup<T>) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id} className="whitespace-nowrap">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id} className="px-6 py-4">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} ref={animationParent}>
          {page.map((row: Row<T>) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id} className="whitespace-nowrap px-6 py-4">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex py-4 items-center">
        
          {/* Page navigation buttons */}
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <ChevronsLeft />
          </button>

          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <ChevronLeft />
          </button>

          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <ChevronRight />
          </button>

          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            <ChevronsRight />
          </button>

          {/* Page x of x indicator */}
          <span className='pl-8 whitespace-nowrap'>
            Page
            <span className='text-green-600 font-bold pl-1'>{pageIndex + 1}</span> of {pageOptions.length}
          </span>

          {/* Go to page input */}
          <span className='px-8 flex items-center whitespace-nowrap'>
             Go to page
            <input
              type="number"
              className="border-2 border-gray-300 rounded-md bg-transparent pl-2 w-12 ml-2"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
            />
          </span>

          {/* Change number of transactions per page */}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
            >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>

      </div>
    </>
  );
}

export default Table