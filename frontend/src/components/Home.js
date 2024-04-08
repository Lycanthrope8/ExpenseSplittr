import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../hooks/useProfileContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useHomeContext } from "../hooks/useHomeContext";
import { useHomeExpense } from "../hooks/useHomeExpense";
import HomeExpenseForm from "./HomeExpenseForm";
import HomeExpenseDetails from "./HomeExpenseDetails";
import SortButton from "./SortButton";
import { HomeTasks } from "./HomeTasks";
import DebtCredit from "./DebtCredit";

export const Home = () => {
  const navigate = useNavigate();
  const { profile } = useProfileContext();
  const { user } = useAuthContext();
  const { home } = useHomeContext();
  const { expenses, dispatch } = useHomeExpense();
  const [sortedExpenses, setSortedExpenses] = useState([]);
  const [sortOption, setSortOption] = useState("date-recent");

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
        dispatch({ type: "SET_EXPENSES", payload: json });
      } else {
        console.error("Failed to fetch home expenses");
      }
    };
    fetchExpenses();
  }, [user, dispatch, profile.homeId]);

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

  const handleHomeDetails = async () => {
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
  const handleDebtorCreditorDetails = async () => {
    const userId = await user.userId;
    try {
      navigate(`/api/debtorCreditor/${userId}`);
    }catch(error){
      console.error(error)
    }
  }

  const handleDelete = (deletedExpenseId) => {
    const updatedSortedExpenses = sortedExpenses.filter((expense) => expense._id !== deletedExpenseId);
    setSortedExpenses(updatedSortedExpenses);
  };

  return (
    <>
      <div className="grid grid-cols-2 border-b-2 border-border mb-4">
        <div className="flex items-center justify-center p-4 hover:bg-secondary/80 rounded-md transition-colors" onClick={handleHomeDetails}>
          <span className="material-symbols-outlined mr-8 text-text text-3xl ">home</span>
          <h1 className="mb-[-4px] text-text text-3xl text-center cursor-pointer">View Home details</h1>
        </div>
        <div className="flex items-center justify-center p-4 hover:bg-secondary/80 rounded-md transition-colors" onClick={handleDebtorCreditorDetails}>
          <span className="material-symbols-outlined mr-8 text-text text-3xl ">partner_exchange</span>
          <h1 className="mb-[-4px] text-text text-3xl text-center cursor-pointer">View Debt/Creditor details</h1>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mx-4">
        <div className="col-span-2 relative">
          <SortButton onSort={handleSort} />
          <div className="border-1 border-border rounded-xl p-4">
          <table className='text-text w-full'>
              <colgroup>
                <col className="w-[700px]"/>
                <col className="w-[300px]" />
                <col className="w-[200px]" />
                <col className="w-[300px]" />
                <col className="w-[200px]" />
              </colgroup>
              <thead className='text-zinc-300 [&_tr]:border-b'>
                <tr className='text-left align-middle border-border text-md'>
                  <th className="pb-4">Title</th>
                  <th className="pb-4">Beneficiaries</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Date</th>
                  <th className="text-center pb-4">Action</th>
                </tr>
              </thead>
              <tbody className='text-text [&_tr:last-child]:border-0'>
            {sortedExpenses && sortedExpenses.length > 0
              ? sortedExpenses.map((expense) => (
                <tr className="w-full border-b border-border" key={expense._id}>
                  <HomeExpenseDetails expense={expense} onDelete={handleDelete} />
                </tr>
              ))
              : expenses &&
              expenses.map((expense) => (
                <tr className="w-full border-b border-border" key={expense._id}>
                  <HomeExpenseDetails expense={expense} />
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
      <HomeExpenseForm expenses={expenses} setSortedExpenses={setSortedExpenses} homeMembers={home.currentMembers} />
      </div>
      <HomeTasks />
    </>
  );
};
