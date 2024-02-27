import { createContext, useReducer } from 'react'

export const personalExpenseContext = createContext()

export const personalExpenseReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXPENSES': 
      return {
        expenses: action.payload
      }
    case 'CREATE_EXPENSE':
      return {
        expenses: [action.payload, ...state.expenses]
      }
    case 'DELETE_EXPENSE':
      return {
        expenses: state.expenses.filter((w) => w._id !== action.payload._id)
      }

    default:
      return state
  }
}

export const PersonalExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(personalExpenseReducer, {
    expenses: null
  })

  return (
    <personalExpenseContext.Provider value={{...state, dispatch}}>
      { children }
    </personalExpenseContext.Provider>
  )
}