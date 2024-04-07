import React, { useState, useEffect } from "react";
import { useHomeExpense } from "../hooks/useHomeExpense";
import { useAuthContext } from "../hooks/useAuthContext";
import moment from "moment";

const HomeExpenseDetails = ({ expense, onDelete }) => {
  const [spendBy, setSpendBy] = useState("");

  useEffect(() => {
    getName();
  }, []);

  const getName = async () => {
    try {
      const response = await fetch(`/profile/${expense.user_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      setSpendBy(json.name);
    } catch (error) {
      console.error(error);
    }
  };

  const { dispatch } = useHomeExpense();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    try {
      const response = await fetch(`/api/homeExpenses/${expense._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_EXPENSE", payload: json });
        if (onDelete) {
          onDelete(expense._id);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formattedDate = moment(expense.createdAt).format(
    `MMMM D, yyyy [at] HH:mm`
  );

  return (
    // <div className="expense-details flex justify-between text-white bg-secondary-dark-bg p-4 mb-4 rounded-2xl">
    //   <div className='flex flex-col'>
    //     <h4 className='text-3xl border-b-1 mb-2'>{expense.title}</h4>
    //     <p className="text-sm">By: {spendBy}</p>
    //     <p className="text-lg mb-4">{expense.tag}</p>
    //     <p className="text-lg mb-4"><strong>Amount: </strong>{expense.amount}</p>
    //     <p className="text-lg mb-4"><strong>Beneficiaries: </strong>{expense.beneficiaries.map(member => member.name).join(', ')}</p>
    //     <p className="text-sm">{formattedDate}</p>
    //   </div>
    //

    // </div>
    <>
      <td className="align-middle py-4">
        <div className="flex space-x-4">
          <div className="font-semibold border-2 border-border rounded-md px-2.5 py-0.5 text-xs">
            {expense.tag}
          </div>{" "}
          <span>{expense.title}</span>
        </div>
      </td>
      <td className="flex text-left align-middle py-4 space-x-1">
        {expense.beneficiaries.map((member, index) => (
          <div
            key={index}
            className="flex items-center justify-center px-2 py-1 bg-secondary rounded-md"
          >
            {member.name}
          </div>
        ))}
      </td>

      <td className="text-left align-middle py-4">{expense.amount}</td>
      <td className="text-left align-middle py-4">{formattedDate}</td>
      <td className="py-2">
        <div className="flex items-center justify-center">
          {user.userId === expense.user_id && (
            <span
              className="material-symbols-outlined text-3xl h-12 w-12 flex items-center justify-center rounded-full hover:cursor-pointer hover:bg-tertiary-dark-bg"
              onClick={handleClick}
            >
              delete
            </span>
          )}
        </div>
      </td>
    </>
  );
};

export default HomeExpenseDetails;
