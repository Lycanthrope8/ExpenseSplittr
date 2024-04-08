import { useEffect, useState, useContext } from "react";
import { DebtCreditContext } from "../context/DebtCreditContext"; // corrected import
import { useProfileContext } from "../hooks/useProfileContext";
import { useAuthContext } from "../hooks/useAuthContext";
import DebtDetails from "./DebtDetails";
import DebtDetailsHistory from "./DebtDetailsHistory";
import CreditDetails from "./CreditDetails";
import CreditDetailsHistory from "./CreditDetailsHistory";

const DebtCredit = () => {
  const { profile } = useProfileContext();
  const { user } = useAuthContext();
  const { state, updateDebtCredit } = useContext(DebtCreditContext);
  const { debts, credits } = state.debtCredit; // Updated to access debts and credits directly
  
  const updateHandler = async () => {
    await updateDebtCredit();
  };


  useEffect(() => {
    updateDebtCredit();
  }, [profile.userId]);

  return (
    <>
    <div className="text-text p-4">
      <h2 className="text-4xl text-center mb-2">Debts</h2>
      
      <div className="border-1 border-border rounded-xl p-4 mb-4">
          <table className='text-text w-full'>
              <colgroup>
                <col className="w-[400px]"/>
                <col className="w-[300px]" />
                <col className="w-[200px]" />
                <col className="w-[200px]" />
                <col className="w-[400px]" />
              </colgroup>
              <thead className='text-zinc-300 [&_tr]:border-b'>
                <tr className='text-left align-middle border-border text-md'>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Title</th>
                  <th className="pb-4">Tag</th>
                  <th className="pb-4">Amount</th>
                  <th className="text-center pb-4">Action</th>
                </tr>
              </thead>
              <tbody className='text-text [&_tr:last-child]:border-0'>
              {debts ? debts.map((debt) => (
                !debt.settled && (
                <tr className="w-full border-b border-border" key={debt._id}>
                  <DebtDetails debt={debt} updateHandler={updateHandler}/>
                </tr>
              ))) : <tr><h1>No debts Found</h1></tr>}
            </tbody>
          </table>
        </div>
      <h2 className="text-4xl text-center mb-2">Creditors</h2>
      
      <div className="border-1 border-border rounded-xl p-4">
          <table className='text-text w-full'>
              <colgroup>
                <col className="w-[400px]"/>
                <col className="w-[300px]" />
                <col className="w-[200px]" />
                <col className="w-[200px]" />
                <col className="w-[400px]" />
              </colgroup>
              <thead className='text-zinc-300 [&_tr]:border-b'>
                <tr className='text-left align-middle border-border text-md'>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Title</th>
                  <th className="pb-4">Tag</th>
                  <th className="pb-4">Amount</th>
                  <th className="text-center pb-4">Action</th>
                </tr>
              </thead>
              <tbody className='text-text [&_tr:last-child]:border-0'>
              {credits.map((credit) => (
                !credit.settled && (
                <tr className="w-full border-b border-border" key={credit._id}>
                  <CreditDetails credit={credit} updateHandler={updateHandler} />
                </tr>
              )))}
            </tbody>
          </table>
        </div>

        <h2 className="text-4xl text-center mb-2">Debts History</h2>
        <div className="border-1 border-border rounded-xl p-4 mb-4">
          <table className='text-text w-full'>
              <colgroup>
                <col className="w-[400px]"/>
                <col className="w-[300px]" />
                <col className="w-[200px]" />
                <col className="w-[200px]" />
              </colgroup>
              <thead className='text-zinc-300 [&_tr]:border-b'>
                <tr className='text-left align-middle border-border text-md'>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Title</th>
                  <th className="pb-4">Tag</th>
                  <th className="pb-4">Amount</th>
                </tr>
              </thead>
              <tbody className='text-text [&_tr:last-child]:border-0'>
              {debts ? debts.map((debt) => (
                debt.settled && (
                <tr className="w-full border-b border-border" key={debt._id}>
                  <DebtDetailsHistory debt={debt}/>
                </tr>
              ))) : <tr><h1>No debts Found</h1></tr>}
            </tbody>
          </table>
        </div>

        <h2 className="text-4xl text-center mb-2">Creditor History</h2>
      
      <div className="border-1 border-border rounded-xl p-4">
          <table className='text-text w-full'>
              <colgroup>
                <col className="w-[400px]"/>
                <col className="w-[300px]" />
                <col className="w-[200px]" />
                <col className="w-[200px]" />
              </colgroup>
              <thead className='text-zinc-300 [&_tr]:border-b'>
                <tr className='text-left align-middle border-border text-md'>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Title</th>
                  <th className="pb-4">Tag</th>
                  <th className="pb-4">Amount</th>
                </tr>
              </thead>
              <tbody className='text-text [&_tr:last-child]:border-0'>
              {credits.map((credit) => (
                credit.settled && (
                <tr className="w-full border-b border-border" key={credit._id}>
                  <CreditDetailsHistory credit={credit} />
                </tr>
              )))}
            </tbody>
          </table>
        </div>
    </div>
    </>
  );  
};

export default DebtCredit;