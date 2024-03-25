import React from 'react';
import { usePersonalExpense } from '../hooks/usePersonalExpense';
import { useAuthContext } from '../hooks/useAuthContext';
import { format } from 'date-fns';

const HomeExpenseDetails = ({ expense, onDelete }) => {
  const { dispatch } = usePersonalExpense();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/homeExpenses/' + expense._id, {
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

  return (
    <div className="expense-details flex justify-between text-white bg-secondary-dark-bg p-4 mb-4 rounded-2xl">
      <div className='flex flex-col'>
        <h4 className='text-3xl border-b-1 mb-2'>{expense.title}</h4>
        <p className="text-lg mb-4">{expense.tag}</p>
        <p className="text-lg mb-4"><strong>Amount: </strong>{expense.amount}</p>
        <p className="text-sm">{formattedDate}</p>
      </div>
      <span className="material-symbols-outlined text-3xl h-12 w-12 flex items-center justify-center rounded-full hover:cursor-pointer hover:bg-tertiary-dark-bg" onClick={handleClick}>delete</span>
    </div>
  );
};

export default HomeExpenseDetails;
