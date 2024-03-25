import { useContext } from 'react';
import { HomeExpenseContext } from "../context/homeExpenseContext";


export const useHomeExpense = () => {
  const context = useContext(HomeExpenseContext);

  if (!context) {
    throw Error('useHomeExpense must be used inside a HomeExpenseProvider');
  }
  return context;
};
