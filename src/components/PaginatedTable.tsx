import React, { useState } from 'react';
import { useTable, useGlobalFilter, usePagination, Column } from 'react-table';
import { Table, Form, InputGroup, Pagination } from 'react-bootstrap';
import { Search } from 'react-feather';
import { useNavigate } from 'react-router-dom';

interface PaginatedTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  searchData:any;
  size?:number;
  pageInd?:string;
  url?:string
}

function PaginatedTable<T extends object>({ columns, data, searchData, size , pageInd, url}: PaginatedTableProps<T>) {
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const navigate = useNavigate()
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  );

  React.useEffect(() => {
    searchData(globalFilterValue)
  }, [globalFilterValue, pageInd]);

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <Search size={18} />
        </InputGroup.Text>
        <Form.Control
          value={globalFilterValue || ''}
          onChange={(e) => setGlobalFilterValue(e.target.value)}
          placeholder="Search..."
          aria-label="Search"

        />
      </InputGroup>

      <Table responsive {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <span>
            Page{' '}
            <strong>
              {pageInd} of {size || 1}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <Form.Control
              type="number"
              defaultValue={pageInd}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value)  : 0;
                if(page < 1 || page > Number(size))
                {
                  return
                }
               navigate(`${url}${page}`)
              }}
              style={{ width: '100px', display: 'inline-block' }}
            />
          </span>{' '}

        </div>
        <Pagination>
          <Pagination.Prev onClick={() =>  navigate(`${url}${Number(pageInd) - 1}`)} disabled={Number(pageInd) <= 1}  />
          <Pagination.Next onClick={() =>  navigate(`${url}${Number(pageInd) + 1}`)} disabled={Number(pageInd) >= Number(size)} />
        </Pagination>
      </div>
    </>
  );
}

export default PaginatedTable;