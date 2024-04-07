// DebtCreditContext.js

import React, { createContext, useReducer, useEffect } from 'react';

export const DebtCreditContext = createContext();

export const debtCreditReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DEBTCREDIT':
      return { ...state, debtCredit: action.payload };
    case 'UPDATE_DEBT':
      return { ...state, debtCredit: { ...state.debtCredit, debts: action.payload } };
    case 'UPDATE_CREDIT':
      return { ...state, debtCredit: { ...state.debtCredit, credits: action.payload } };
    default:
      return state;
  }
};

export const DebtCreditProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [state, dispatch] = useReducer(debtCreditReducer, {
    debtCredit: { debts: [], credits: [] },
  });

  useEffect(() => {
    const fetchDebtCredit = async () => {
      try {
        const response = await fetch(`/api/debtorCreditor/${user.userId}`);
        const json = await response.json();
        // console.log('json:', json);
        dispatch({ type: 'SET_DEBTCREDIT', payload: json });
      } catch (error) {
        console.error('Error fetching debt credit: ', error);
      }
    };
    fetchDebtCredit();
  }, []);

  const updateDebtCredit = async () => {
    try {
      const response = await fetch(`/api/debtorCreditor/${user.userId}`);
      const json = await response.json();
      dispatch({ type: 'UPDATE_DEBT', payload: json.debts });
      dispatch({ type: 'UPDATE_CREDIT', payload: json.credits });
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