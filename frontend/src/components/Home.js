import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../hooks/useProfileContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useHomeExpense } from "../hooks/useHomeExpense";
import useHomeMateRetriever from "../hooks/useHomeMateRetriever";
import HomeExpenseForm from "./HomeExpenseForm";
import HomeExpenseDetails from "./HomeExpenseDetails";
import SortButton from "./SortButton";
import { HomeTasks }from "./HomeTasks";

export const Home = () => {
  const navigate = useNavigate();
  const { profile } = useProfileContext();
  const { user } = useAuthContext();
  const { expenses, dispatch } = useHomeExpense();
  const [sortedExpenses, setSortedExpenses] = useState([]);
  const [sortOption, setSortOption] = useState("date-recent");
  const { currentMembers } = useHomeMateRetriever(profile.homeId);
  console.log("Current members:", currentMembers);


  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user || !profile.homeId) {
        return; // If user or homeId is not available, exit early
      }

      const url = `/api/homeExpenses/${profile.homeId}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (response.ok) {
        const json = await response.json();
        // console.log(json);
        dispatch({ type: "SET_EXPENSES", payload: json });
      } else {
        console.error("Failed to fetch home expenses");
      }
    };
    fetchExpenses();
   

  }, [user, dispatch, profile.homeId, currentMembers]); 
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

  const handleDelete = (deletedExpenseId) => {
    // Filter out the deleted expense from sortedExpenses
    const updatedSortedExpenses = sortedExpenses.filter(
      (expense) => expense._id !== deletedExpenseId
    );
    setSortedExpenses(updatedSortedExpenses);
  };

  return (
    <>
      <div onClick={handleClick}>
        <h1 className="text-text text-4xl text-center mb-4 hover:text-zinc-300 cursor-pointer">See Home details</h1>
      </div>

      <div className="home grid grid-cols-3 gap-4 mx-4">
        <div className="col-span-2 relative">
        <SortButton onSort={handleSort} />
        <div>
          {sortedExpenses && sortedExpenses.length > 0
            ? sortedExpenses.map((expense) => (
                <div className="expense-details-wrapper" key={expense._id}>
                  <HomeExpenseDetails expense={expense} onDelete={handleDelete} />
                </div>
              ))
            : expenses &&
              expenses.map((expense) => (
                <div className="expense-details-wrapper" key={expense._id}>
                  <HomeExpenseDetails expense={expense} />
                </div>
              ))}
        </div>
        </div>
        <HomeExpenseForm expenses={expenses} setSortedExpenses={setSortedExpenses} />
      </div>
      <HomeTasks />
    </>
  );
};
