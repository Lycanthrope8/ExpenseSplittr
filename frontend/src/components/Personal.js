import React, { useState, useEffect } from "react";
import { usePersonalExpense } from "../hooks/usePersonalExpense";
import { useAuthContext } from "../hooks/useAuthContext";
import {PersonalExpenseDetails} from "./PersonalExpenseDetails";
import PersonalExpenseForm from "./PersonalExpenseForm";
import SortButton from "./SortButton";

export const Personal = () => {
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
  }, [dispatch, user, sortOption]);
  
  const handleDelete = (deletedExpenseId) => {
    // Filter out the deleted expense from sortedExpenses
    const updatedSortedExpenses = sortedExpenses.filter(
      (expense) => expense._id !== deletedExpenseId
    );
    setSortedExpenses(updatedSortedExpenses);
  };

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
        sorted = expenses
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        break;
      case "date-least-recent":
        sorted = expenses
          .slice()
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        break;
      default:
        sorted = expenses;
    }
    setSortedExpenses(sorted);
  };
  return (
    <div className="home grid grid-cols-3 gap-4 mx-4">
      <div className="col-span-2 relative">
        <SortButton onSort={handleSort} />
        <div>
          <table className='text-text w-full'>
              <thead className='text-text'>
                <tr className=''>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='text-text text-center'>
            {sortedExpenses && sortedExpenses.length > 0
              ? sortedExpenses.map((expense) => (
                  <tr className="w-full" key={expense._id}>
                    <PersonalExpenseDetails expense={expense} onDelete={handleDelete} />
                  </tr>
                ))
              : expenses &&
                expenses.map((expense) => (
                  <tr className="w-full" key={expense._id}>
                    <PersonalExpenseDetails expense={expense} />
                  </tr>
                ))
            }
            </tbody>
          </table>
        </div>
      </div>
      <PersonalExpenseForm expenses={expenses} setSortedExpenses={setSortedExpenses} />

    </div>
  );
};

// export default Personal;
