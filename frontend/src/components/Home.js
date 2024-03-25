import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileContext } from '../hooks/useProfileContext';
import { useAuthContext } from '../hooks/useAuthContext';
import HomeExpenseForm from './HomeExpenseForm';
import { HomeExpenseProvider } from '../context/homeExpenseContext';
import HomeExpenseDetails from './HomeExpenseDetails';

export const Home = () => {
  const navigate = useNavigate();
  const { profile } = useProfileContext();
  const { user } = useAuthContext();

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
        <h1>See Home details</h1>
      </div>
      <HomeExpenseProvider>
        <HomeExpenseForm />
        {/* Render other components related to home expenses */}
        <HomeExpenseDetails expense={sampleExpenseData} onDelete={handleDelete} />
      </HomeExpenseProvider>
    </>
  );
};
