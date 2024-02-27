import { useEffect } from "react";
import { usePersonalExpense } from "../hooks/usePersonalExpense";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import ExpenseDetails from "../components/PersonalExpenseDetails";
import PersonalExpenseForm from "../components/PersonalExpenseForm";

const Home = () => {
  const { expenses, dispatch } = usePersonalExpense();
  const { user } = useAuthContext();

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

  return (
    <div className="home">
      <div className="expenses">
        {expenses &&
          expenses.map((expense) => (
            <ExpenseDetails expense={expense} key={expense._id} />
          ))}
      </div>
      <PersonalExpenseForm />
    </div>
  );
};

export default Home;
