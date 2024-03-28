
import { usePersonalExpense } from '../hooks/usePersonalExpense';
import { useAuthContext } from '../hooks/useAuthContext';
import { format } from 'date-fns';
 
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

  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // })

  return (
    <>

    <td className='align-middle py-4'><div className='flex space-x-4'><div className='font-semibold border-2 border-border rounded-md px-2.5 py-0.5 text-xs'>{expense.tag}</div> <span>{expense.title}</span></div></td>
    <td className='text-left align-middle py-4'>{expense.amount}</td>
    <td className='text-left align-middle py-4'>{formattedDate}</td>
    <td className='py-2'><div className='flex items-center justify-center'><span className="material-symbols-outlined text-2xl w-10 h-10 flex justify-center items-center rounded-full hover:cursor-pointer hover:bg-secondary hover:text-red-400 transition-colors" onClick={handleClick}>delete</span></div></td>

    </>
)};

// export default PersonalExpenseDetails;