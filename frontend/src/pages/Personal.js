import React from 'react';
import { useState, useEffect } from "react";
import { usePersonalExpense } from "../hooks/usePersonalExpense";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import ExpenseDetails from "../components/PersonalExpenseDetails";
import PersonalExpenseForm from "../components/PersonalExpenseForm";
import SortButton from "../components/SortButton";

const Personal = () => {
  const { expenses, dispatch } = usePersonalExpense();
  const { user } = useAuthContext();
  const [sortedExpenses, setSortedExpenses] = useState([]);
  const [sortOption, setSortOption] = useState("");

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
        sorted = expenses.sort((a, b) => a.amount - b.amount);
        break;
      case "amount-high-low":
        sorted = expenses.sort((a, b) => b.amount - a.amount);
        break;
      case "date-recent":
        sorted = expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "date-least-recent":
        sorted = expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        sorted = expenses;
    }
  };

  return (
    <div className="home">
      <SortButton onSort={handleSort}/>
      <div className="expenses">
        {expenses &&
          expenses.map((expense) => (
            <div className="expense-details-wrapper" key={expense._id}>
              <ExpenseDetails expense={expense} />
            </div>
          ))}
      </div>
      <PersonalExpenseForm />
    </div>
  );
};

export default Personal;
