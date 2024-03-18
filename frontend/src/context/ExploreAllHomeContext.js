import { createContext, useReducer } from 'react'

export const ExploreAllHomeContext = createContext()

export const ExploreAllHomeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXPENSES': 
      return {
        expenses: action.payload
      }

    default:
      return state
  }
}

export const ExploreAllHomeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ExploreAllHomeReducer, {
    expenses: null
  })

  return (
    <ExploreAllHomeContext.Provider value={{...state, dispatch}}>
      { children }
    </ExploreAllHomeContext.Provider>
  )
}