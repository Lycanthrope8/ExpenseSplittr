import { useEffect, useState, useContext } from "react";
import { DebtCreditContext } from "../context/DebtCreditContext"; // corrected import
import { useProfileContext } from "../hooks/useProfileContext";
import { useAuthContext } from "../hooks/useAuthContext";

const DebtCredit = () => {
  const { profile } = useProfileContext();
  const { user } = useAuthContext();
  const { state, updateDebtCredit } = useContext(DebtCreditContext);
  const { debts, credits } = state.debtCredit; // Updated to access debts and credits directly
  
  useEffect(() => {
    updateDebtCredit();
  }, [profile.userId]);

  useEffect(() => {
    const fetchDebtCredit = async () => {
      try {
        const response = await fetch(`/api/debtorCreditor/${profile.userId}`);
        const json = await response.json();
        // setDebts(json.debts);
        // setCredits(json.credits);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDebtCredit();
  }, [profile.userId]);

  const handleSettle = (id) => async () => {
    try {
      const response = await fetch(`/api/debtorCreditor/underSettlement/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ UnderSettlement: true }),
      });
      if (response.ok)
      updateDebtCredit();
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmSettlement = (id) => async () => {
    try {
      const response = await fetch(`/api/debtorCreditor/settled/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ settled: true }),
      });
      if(response.ok)
      updateDebtCredit();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeclineSettlement = (id) => async () => {
    try {
      const response = await fetch(`/api/debtorCreditor/underSettlement/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ UnderSettlement: false }),
      });
      if (response.ok)
      updateDebtCredit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-text">
      <h2>You owe money to</h2>
      <ul>
        {debts.map((debt) => (
          !debt.settled && (
            <li key={debt._id}>
              <span>Name: {debt.creditor.name}</span>
              <span>Title: {debt.title || "N/A"}</span>
              <span>Tag: {debt.tag || "N/A"}</span>
              <span>Amount: {debt.amount || "N/A"}</span>
              {!debt.UnderSettlement ? (
                <button onClick={handleSettle(debt._id)}>Settle</button>
              ) : (
                <button>Waiting for Confirmation</button>
              )}
            </li>
          )
        ))}
      </ul>
      <h2>You are owed money from</h2>
      <ul>
        {credits.map((credit) => (
          !credit.settled && (
            <li key={credit._id}>
              <span>Name: {credit.debtor.name}</span>
              <span>Title: {credit.title || "N/A"}</span>
              <span>Tag: {credit.tag || "N/A"}</span>
              <span>Amount: {credit.amount || "N/A"}</span>
              {credit.UnderSettlement ? (
                <div>
                  <button onClick={handleConfirmSettlement(credit._id)}>Confirm Settlement</button>
                  <button onClick={handleDeclineSettlement(credit._id)}>Decline Settlement</button>
                </div>
              ) : (
                <div>
                  <button>Waiting for Settlement</button>
                </div>
              )}
            </li>
          )
        ))}
      </ul>
    </div>
  );  
};

export default DebtCredit;