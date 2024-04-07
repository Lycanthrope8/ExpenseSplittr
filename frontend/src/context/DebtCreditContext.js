import React, { createContext, useReducer, useEffect } from 'react';

export const DebtCreditContext = createContext();

export const debtCreditReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DEBTCREDIT':
      return { ...state, debts: action.payload };
    case 'UPDATE_DEBTCREDIT':
      return { ...state, debts: action.payload };
    default:
      return state;
  }
};

export const DebtCreditProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [state, dispatch] = useReducer(debtCreditReducer, {
    debts: [],
    credits: [],
  });

  useEffect(() => {
    const fetchDebtCredit = async () => {
      try {
        const response = await fetch(`/api/debtorCreditor/${user.userId}`);
        const json = await response.json();
        dispatch({ type: 'SET_DEBTCREDIT', payload: json.debts });
      } catch (error) {
        console.error('Error fetching debt credit: ', error);
      }
    };
    fetchDebtCredit();
  }, [user.userId]);

  const updateDebtCredit = async () => {
    try {
      const response = await fetch(`/api/debtorCreditor/${user.userId}`);
      const json = await response.json();
      dispatch({ type: 'UPDATE_DEBTCREDIT', payload: json.debts });
    } catch (error) {
      console.error('Error updating debt credit: ', error);
    }
  };

  return (
    <DebtCreditContext.Provider value={{ state, updateDebtCredit }}>
      {children}
    </DebtCreditContext.Provider>
  );
};
