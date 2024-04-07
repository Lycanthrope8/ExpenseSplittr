import { useEffect } from "react";
import { useDebtCreditContext } from "../hooks/useDebtCreditContext";
import { useProfileContext } from "../hooks/useProfileContext";
import { useAuthContext } from "../hooks/useAuthContext";

const DebtCredit = () => {
  const { profile } = useProfileContext();
  const { user } = useAuthContext();
  const { state, dispatch } = useDebtCreditContext();

  useEffect(() => {
    const fetchDebtCredit = async () => {
      try {
        const response = await fetch(`/api/debtorCreditor/${profile.userId}`);
        const json = await response.json();

        dispatch({ type: 'SET_DEBTS', payload: json.debts });
        dispatch({ type: 'SET_CREDITS', payload: json.credits });

        // Format debtors
        const formattedDebtors = json.credits.reduce((debtors, credit) => {
          const debtor = credit.debtor;
          if (!debtors.some((item) => item.userId === debtor.userId)) {
            debtors.push(debtor);
          }
          return debtors;
        }, []);
        dispatch({ type: 'SET_FORMATTED_DEBTORS', payload: formattedDebtors });

        // Format creditors
        const formattedCreditors = json.debts.reduce((creditors, debt) => {
          const creditor = debt.creditor;
          if (!creditors.some((item) => item.userId === creditor.userId)) {
            creditors.push(creditor);
          }
          return creditors;
        }, []);
        dispatch({ type: 'SET_FORMATTED_CREDITORS', payload: formattedCreditors });
      } catch (error) {
        console.error(error);
      }
    };
    fetchDebtCredit();
  }, [profile.userId, dispatch]);

  const handleSettle = (id) => {
    return async () => {
      const response = await fetch(
        `/api/debtorCreditor/underSettlement/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ UnderSettlement: true }),
        }
      );
    };
  };

  const handleConfirmSettlement = (id) => {
    return async () => {
      const response = await fetch(
        `/api/debtorCreditor/settled/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ settled: true }),
        }
      );
    };
  };

  const handleDeclineSettlement = (id) => {
    return async () => {
      const response = await fetch(
        `/api/debtorCreditor/underSettlement/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ UnderSettlement: false }),
        }
      );
    };
  };

  return (
    <div className="text-text">
      <h2>You owe money to</h2>
      <ul>
        {state.formattedCreditors.map(
          (creditor) =>
            !state.debts.find(
                (debt) => debt.creditor.userId === creditor.userId
              )?.settled && (
              <li key={creditor.userId}>
                <span>Name: {creditor.name}</span>
                <span>
                  Title:{" "}
                  {state.debts.find(
                    (debt) => debt.creditor.userId === creditor.userId
                  )?.title || "N/A"}
                </span>
                <span>
                  Tag:{" "}
                  {state.debts.find(
                    (debt) => debt.creditor.userId === creditor.userId
                  )?.tag || "N/A"}
                </span>
                <span>
                  Amount:{" "}
                  {state.debts.find(
                    (debt) => debt.creditor.userId === creditor.userId
                  )?.amount || "N/A"}
                </span>
                {!state.debts.find((debt) => debt.creditor.userId === creditor.userId)
                  .UnderSettlement ? (
                  <button
                    onClick={handleSettle(
                      state.debts.find(
                        (debt) => debt.creditor.userId === creditor.userId
                      )?._id
                    )}
                  >
                    Settle
                  </button>
                ) : (
                  <button>Waiting for Confirmation</button>
                )}
              </li>
            )
        )}
      </ul>
      <h2>You are owed money from</h2>
      <ul>
        {state.formattedDebtors.map((debtor) => (
          !state.credits.find(
              (credit) => credit.debtor.userId === debtor.userId
          )?.settled && (
              <li key={debtor.userId}>
                  <span>Name: {debtor.name}</span>
                  <span>
                      Title:{" "}
                      {state.credits.find(
                          (credit) => credit.debtor.userId === debtor.userId
                      )?.title || "N/A"}
                  </span>
                  <span>
                      Tag:{" "}
                      {state.credits.find(
                          (credit) => credit.debtor.userId === debtor.userId
                      )?.tag || "N/A"}
                  </span>
                  <span>
                      Amount:{" "}
                      {state.credits.find(
                          (credit) => credit.debtor.userId === debtor.userId
                      )?.amount || "N/A"}
                  </span>
                  {state.credits.find((credit) => credit.debtor.userId === debtor.userId)?.UnderSettlement ? (
                      <div>
                          <button
                              onClick={handleConfirmSettlement(
                                  state.credits.find(
                                      (credit) => credit.debtor.userId === debtor.userId
                                  )?._id
                              )}
                          >
                              Confirm Settlement
                          </button>
                          <button
                              onClick={handleDeclineSettlement(
                                  state.credits.find(
                                      (credit) => credit.debtor.userId === debtor.userId
                                  )?._id
                              )}
                          >
                              Decline Settlement
                          </button>
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
