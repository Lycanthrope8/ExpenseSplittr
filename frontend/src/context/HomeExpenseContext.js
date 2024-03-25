import { createContext, useReducer } from 'react';

export const HomeExpenseContext = createContext();

export const HomeExpenseReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXPENSES':
      return {
        expenses: action.payload,
      };
    case 'CREATE_EXPENSE':
      return {
        expenses: [action.payload, ...state.expenses],
      };
    case 'DELETE_EXPENSE':
      return {
        expenses: state.expenses.filter((expense) => expense._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const HomeExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HomeExpenseReducer, {
    expenses: [],
  });

  return (
    <HomeExpenseContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HomeExpenseContext.Provider>
  );
};
