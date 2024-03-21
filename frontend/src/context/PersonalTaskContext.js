import { createContext, useReducer } from 'react'

export const personalTaskContext = createContext()

export const personalTaskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TaskS': 
      return {
        tasks: action.payload
      }
    case 'CREATE_Task':
      return {
        tasks: [action.payload, ...state.tasks]
      }
    case 'DELETE_Task':
      return {
        tasks: state.tasks.filter((w) => w._id !== action.payload._id)
      }

    default:
      return state
  }
}

export const PersonalTaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(personalTaskReducer, {
    tasks: null
  })

  return (
    <personalTaskContext.Provider value={{...state, dispatch}}>
      { children }
    </personalTaskContext.Provider>
  )
}