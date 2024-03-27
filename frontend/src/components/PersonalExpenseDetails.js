import { useState, useEffect } from 'react';
import { usePersonalExpense } from '../hooks/usePersonalExpense';
import { useAuthContext } from '../hooks/useAuthContext';
import { format, set } from 'date-fns';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
 
export const PersonalExpenseDetails = ({ expense, onDelete }) => {
  const { dispatch } = usePersonalExpense();
  const { user } = useAuthContext();
  
  const handleClick = async () => {
    if (!user) {
      return;
    }
    
    const response = await fetch('/api/personalExpenses/' + expense._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_EXPENSE', payload: json });
      if (onDelete) {
        onDelete(expense._id);
      }
    }
  };

  const formattedDate = format(new Date(expense.createdAt), "MMMM dd, yyyy 'at' HH:mm");

  /* @type import('@tanstack/react-table').ColumnDef<any> */
  const data = [expense];
  const columns = [
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Tag",
      accessorKey: "tag",
    },
    {
      header: "Amount",
      accessorKey: "amount",
    },
    {
      header: "Date",
      accessorKey: "createdAt",
    },
    {
      header: "Actions",
      accessorKey: "actions",
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    // <div className="expense-details flex justify-between text-white bg-secondary-dark-bg p-4 mb-4 rounded-2xl">
    //   <div className='flex flex-col'>
    //     <h4 className='text-3xl border-b-1 mb-2'>{expense.title}</h4>
    //     <p className="text-lg mb-4">{expense.tag}</p>
    //     <p className="text-lg mb-4"><strong>Amount: </strong>{expense.amount}</p>
    //     <p className="text-sm">{formattedDate}</p>
    //   </div>
    //   <span className="material-symbols-outlined text-3xl h-12 w-12 flex items-center justify-center rounded-full hover:cursor-pointer hover:bg-tertiary-dark-bg" onClick={handleClick}>delete</span>
    // </div>
    
    <>
      {/* <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table> */}

      {/* <table className='text-text w-full'>
        <thead className='border-b'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className='text-center' key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className='' key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className='p-4' key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className='' key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
        {/* <tr className='flex flex-row justify-evenly w-full'> */}
          <td>{expense.tag}{expense.title}</td>
          <td>{expense.amount}</td>
          <td>{formattedDate}</td>
          <td className='flex justify-center'><span className="material-symbols-outlined text-3xl h-12 w-12 flex items-center justify-center rounded-full hover:cursor-pointer hover:bg-tertiary-dark-bg" onClick={handleClick}>delete</span></td>
        {/* </tr> */}
    </>
)};

// export default PersonalExpenseDetails;