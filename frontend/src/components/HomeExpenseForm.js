import React, { useState, useContext } from "react";
import { useHomeExpense } from "../hooks/useHomeExpense";
import { useAuthContext } from "../hooks/useAuthContext";
import { ProfileContext } from '../context/ProfileContext';
import ExpenseTagDropdown from './ExpenseTagDropdown';
import { Checkbox } from "@mui/material";

const HomeExpenseForm = ({ expenses, setSortedExpenses, sortOption, homeMembers }) => {
  const { dispatch } = useHomeExpense();
  const { user } = useAuthContext();
  const { profile } = useContext(ProfileContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to add an expense");
      return;
    }
    
    const expense = { title, amount , tag: selectedTag, home_id: profile.homeId, user_id: user.userId, members: selectedMembers };
    
    const response = await fetch("/api/homeExpenses/", {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setEmptyFields([]);
      setError(null);
      setTitle("");
      setAmount("");
      setSelectedTag("");
      setSelectedMembers([]);

      // Dispatch the action to create expense
      dispatch({ type: "CREATE_EXPENSE", payload: json });

      // Sort the expenses based on the current sort option
      let sorted;
      switch (sortOption) {
        case "amount-low-high":
          sorted = [json, ...expenses].sort((a, b) => a.amount - b.amount);
          break;
        case "amount-high-low":
          sorted = [json, ...expenses].sort((a, b) => b.amount - a.amount);
          break;
        case "date-recent":
          sorted = [json, ...expenses].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case "date-least-recent":
          sorted = [json, ...expenses].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          break;
        default:
          sorted = [json, ...expenses];
      }
      setSortedExpenses(sorted);
    }
  };

  const handleMemberChange = (e) => {
    const memberId = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedMembers([...selectedMembers, memberId]);
    } else {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    }
    console.log(selectedMembers);
  };

  return (
    <form className="create flex flex-col h-max bg-secondary-dark-bg text-white p-4 rounded-2xl" onSubmit={handleSubmit}>
      <h1 className="mb-4 text-xl font-bold text-center">Add a New Expense</h1>
      <ExpenseTagDropdown
        expenseTags={profile.expenseTags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <div className="grid grid-cols-8 h-10 mb-4">
        <label className="flex items-center mr-4 text-xl col-span-2">Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : "col-span-6 p-2 bg-tertiary-dark-bg text-zinc-200 rounded-xl"}
        />
      </div>
      <div className="grid grid-cols-8 h-10 mb-4">
        <label className="flex items-center mr-4 text-xl col-span-2">Amount:</label>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          className={emptyFields.includes("amount") ? "error" : "col-span-6 p-2 bg-tertiary-dark-bg text-zinc-200 rounded-xl"}
        />
      </div>
      <div className="grid grid-cols-8 h-10 mb-4">
        <label className="flex items-center mr-4 text-xl col-span-2">Beneficiaries:</label>
        <div className="col-span-6 p-2 bg-tertiary-dark-bg text-zinc-200 rounded-xl">
          {homeMembers.map((member) => (
            <div key={member.userId} className="mb-2">
              <Checkbox
                checked={selectedMembers.includes(member.userId)}
                onChange={handleMemberChange}
                value={member.userId}
              />
              <span>{member.name}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="mt-2 p-2 bg-accent text-zinc-800 rounded-2xl">Add Expense</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default HomeExpenseForm;
