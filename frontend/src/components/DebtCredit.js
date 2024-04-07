import { useEffect, useState, useContext } from "react";
import { DebtCreditContext } from "../context/DebtCreditContext";
import { useProfileContext } from "../hooks/useProfileContext";
import { useAuthContext } from "../hooks/useAuthContext";
// import { useAuthContext } from "../hooks/useAuthContext";
import DebtDetails from "./DebtDetails";
import CreditDetails from "./CreditDetails";
import HomeExpenseForm from "./HomeExpenseForm";
import { de } from "date-fns/locale";

const DebtCredit = () => {
  const { profile } = useProfileContext();
  const { user } = useAuthContext();
  const { state, updateDebtCredit } = useContext(DebtCreditContext);
  const [debts, setDebts] = useState([]);
  const [credits, setCredits] = useState([]);
  const [totalDebt, setTotalDebt] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [formattedDebtors, setFormattedDebtors] = useState([]);
  const [formattedCreditors, setFormattedCreditors] = useState([]);

  useEffect(() => {
    setDebts(state.debts);
    setCredits(state.credits);
  }, [state]);
 
  useEffect(() => {
    const fetchDebtCredit = async () => {
      try {
        const response = await fetch(`/api/debtorCreditor/${profile.userId}`);
        const json = await response.json();
        setDebts(json.debts);
        setCredits(json.credits);
        setTotalDebt(json.totalDebt);
        setTotalCredit(json.totalCredit);

        // Format debtors
        const formattedDebtors = json.credits.reduce((debtors, credit) => {
          const debtor = credit.debtor;
          if (!debtors.some((item) => item.userId === debtor.userId)) {
            debtors.push(debtor);
          }
          return debtors;
        }, []);
        setFormattedDebtors(formattedDebtors);

        // Format creditors
        const formattedCreditors = json.debts.reduce((creditors, debt) => {
          const creditor = debt.creditor;
          if (!creditors.some((item) => item.userId === creditor.userId)) {
            creditors.push(creditor);
          }
          return creditors;
        }, []);
        setFormattedCreditors(formattedCreditors);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDebtCredit();
  }, [profile.userId]);

  // const handleSettle = (id) => {
  //   return async () => {
  //   //   console.log("id: ", id);
  //     const response = await fetch(
  //       `/api/debtorCreditor/underSettlement/${id}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //         body: JSON.stringify({ UnderSettlement: true }),
  //       }
  //     );
  //   };
  // };

  // const handleConfirmSettlement = (id) => {
  //   return async () => {
  //   //   console.log("id: ", id);
  //     const response = await fetch(
  //       `/api/debtorCreditor/settled/${id}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //         body: JSON.stringify({ settled: true }),
  //       }
  //     );
  //   };
  // };

  // const handleDeclineSettlement = (id) => {
  //   return async () => {
  //   //   console.log(" id: ", id);
  //     const response = await fetch(
  //       `/api/debtorCreditor/underSettlement/${id}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //         body: JSON.stringify({ UnderSettlement: false }),
  //       }
  //     );
  //   };
  // };

  // console.log(formattedCreditors.map((creditor) => creditor));
  // console.log(formattedDebtors.map((debtor) => debtor));
  

  return (
    <>
    <div className="text-text">
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
              {debts.map((debt) => (
                !debt.settled && (
                <tr className="w-full border-b border-border" key={debt._id}>
                  <DebtDetails debt={debt}/>
                </tr>
              )))}
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
                  <CreditDetails credit={credit} />
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
