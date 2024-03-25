import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileContext } from '../hooks/useProfileContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useHomeExpense } from '../hooks/useHomeExpense';
import HomeExpenseForm from './HomeExpenseForm';
import { HomeExpenseProvider } from '../context/HomeExpenseContext';
import HomeExpenseDetails from './HomeExpenseDetails';

export const Home = () => {
  const navigate = useNavigate();
  const { profile } = useProfileContext();
  const { user } = useAuthContext();
  const { expenses, dispatch } = useHomeExpense();


  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user || !profile.homeId) {
        return; // If user or homeId is not available, exit early
      }
  
      const url = `/api/homeExpenses?homeId=${profile.homeId}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
  
      if (response.ok) {
        const json = await response.json();
        console.log(json);  
        // dispatch({ type: "SET_EXPENSES", payload: json });
      } else {
        console.error('Failed to fetch home expenses');
      }
    };
  
    fetchExpenses();
  }, [user, profile.homeId]); // Include user and profile.homeId in dependencies
  
  const handleClick = async () => {
    const homeId = await profile.homeId;

    try {
      const response = await fetch(`/home/${homeId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        if (json.owner_id === user.userId) {
          navigate(`/homedetailsOwner/${homeId}`);
        } else {
          navigate(`/homedetails/${homeId}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Sample expense data and delete function
  const sampleExpenseData = {
    _id: '123',
    title: 'Expense Title',
    tag: 'Expense Tag',
    amount: 100,
    createdAt: new Date(),
  };

  const handleDelete = (expenseId) => {
    // Implement delete functionality
    console.log('Deleting expense with ID:', expenseId);
  };

  return (
    <>
      <div onClick={handleClick}>
        <h1 className='text-zinc-400 text-4xl'>See Home details</h1>
      </div>
        {/* Render other components related to home expenses */}
      <div className="home grid grid-cols-3 gap-4 mx-4">
      <div className="col-span-2 relative">
        {expenses && expenses.map((expense) => (
            <div key={expense._id}>
              <HomeExpenseDetails expense={expense} />
            </div>))}
      </div>
        <HomeExpenseForm />
      </div>
    </>
  );
};
