import React, { createContext, useReducer, useEffect } from 'react';

export const DebtCreditContext = createContext();

export const debtCreditReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DEBTS':
      return { ...state, debts: action.payload };
    case 'SET_CREDITS':
      return { ...state, credits: action.payload };
    case 'SET_FORMATTED_DEBTORS':
      return { ...state, formattedDebtors: action.payload };
    case 'SET_FORMATTED_CREDITORS':
      return { ...state, formattedCreditors: action.payload };
    case 'SETTLE_DEBT':
      return { ...state, debts: action.payload };
    case 'CONFIRM_SETTLEMENT':
      return { ...state, credits: action.payload };
    case 'DECLINE_SETTLEMENT':
      return { ...state, credits: action.payload };
    default:
      return state;
  }
};

export const DebtCreditProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [state, dispatch] = useReducer(debtCreditReducer, {
    debts: [],
    credits: [],
    formattedDebtors: [],
    formattedCreditors: [],
  });

  useEffect(() => {
    const fetchDebtCredit = async () => {
      try {
        const response = await fetch(`/api/debtorCreditor/${user.userId}`);
        const json = await response.json();

        dispatch({ type: 'SET_DEBTS', payload: json.debts });
        dispatch({ type: 'SET_CREDITS', payload: json.credits });

        const formattedDebtors = json.credits.reduce((debtors, credit) => {
          const debtor = credit.debtor;
          if (!debtors.some((item) => item.userId === debtor.userId)) {
            debtors.push(debtor);
          }
          return debtors;
        }, []);
        dispatch({ type: 'SET_FORMATTED_DEBTORS', payload: formattedDebtors });

        const formattedCreditors = json.debts.reduce((creditors, debt) => {
          const creditor = debt.creditor;
          if (!creditors.some((item) => item.userId === creditor.userId)) {
            creditors.push(creditor);
          }
          return creditors;
        }, []);
        dispatch({ type: 'SET_FORMATTED_CREDITORS', payload: formattedCreditors });
      } catch (error) {
        console.error('Error fetching debt credit: ', error);
      }
    };
    fetchDebtCredit();
  }, [user.userId]);

  return (
    <DebtCreditContext.Provider value={{ state, dispatch }}>
      {children}
    </DebtCreditContext.Provider>
  );
};
