import React, { useState, useEffect } from 'react';
import { usePersonalExpense } from "../hooks/usePersonalExpense";
import { useAuthContext } from "../hooks/useAuthContext";
import ExpenseDetails from "../components/PersonalExpenseDetails";
import PersonalExpenseForm from "../components/PersonalExpenseForm";
import SortButton from "../components/SortButton";

const Personal = () => {
  const { expenses, dispatch } = usePersonalExpense();
  const { user } = useAuthContext();
  const [sortedExpenses, setSortedExpenses] = useState([]);
  const [sortOption, setSortOption] = useState("date-recent");

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch("/api/personalExpenses", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_EXPENSES", payload: json });
      }
    };
    if (user) {
      fetchExpenses();
    }
  }, [dispatch, user]);

  const handleSort = (option) => {
    setSortOption(option);
    let sorted;
    switch (option) {
      case "amount-low-high":
        sorted = expenses.slice().sort((a, b) => a.amount - b.amount);
        break;
      case "amount-high-low":
        sorted = expenses.slice().sort((a, b) => b.amount - a.amount);
        break;
      case "date-recent":
        sorted = expenses.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "date-least-recent":
        sorted = expenses.slice().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      default:
        sorted = expenses;
    }
    setSortedExpenses(sorted);
  };
  
  return (
    <div className="home">
  <SortButton onSort={handleSort}/>
  <div className="expenses">
    {sortedExpenses && sortedExpenses.length > 0 ? (
      sortedExpenses.map((expense) => (
        <div className="expense-details-wrapper" key={expense._id}>
          <ExpenseDetails expense={expense} />
        </div>
      ))
    ) : (
      expenses && expenses.map((expense) => (
        <div className="expense-details-wrapper" key={expense._id}>
          <ExpenseDetails expense={expense} />
        </div>
      ))
    )}
  </div>
  <PersonalExpenseForm />
</div>

  );
};

export default Personal;
