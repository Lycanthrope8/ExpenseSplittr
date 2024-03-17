import { useState } from "react";
import { usePersonalExpense } from "../hooks/usePersonalExpense";
import { useAuthContext } from "../hooks/useAuthContext";


const PersonalExpenseForm = () => {
  const { dispatch } = usePersonalExpense();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to add a expense");
      return;
    }

    const expense = { title, amount };

    const response = await fetch("/api/personalExpenses/", {
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
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setTitle("");
      setAmount("");
      dispatch({ type: "CREATE_EXPENSE", payload: json });
    }
  };

  return (
    <form className="create flex flex-col h-72 bg-secondary-dark-bg text-white p-4 rounded-2xl" onSubmit={handleSubmit}>
      <h1 className="mb-2 text-xl font-bold text-center">Add a New Expense</h1>
      <div className="grid grid-cols-5 h-10 mb-4">
        <label className="align-middle mr-4 text-xl">Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : "col-span-4 p-2 bg-tertiary-dark-bg text-zinc-200 rounded-xl"}
        />
      </div>

      <div className="grid grid-cols-5 h-10 mb-4">
        <label className="align-middle mr-4 text-xl">Amount:</label>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          className={emptyFields.includes("amount") ? "error" : "col-span-4 p-2 bg-tertiary-dark-bg text-zinc-200 rounded-xl"}
        />
      </div>

  

      <button className="mt-2 p-2 bg-accent text-zinc-800 rounded-2xl">Add Expense</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default PersonalExpenseForm;
