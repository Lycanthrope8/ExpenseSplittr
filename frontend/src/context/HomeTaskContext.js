import { createContext, useReducer } from 'react'

export const homeTaskContext = createContext()

export const homeTaskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS': 
      return {
        tasks: action.payload
      }
    case 'CREATE_TASK':
      return {
        tasks: [action.payload, ...state.tasks]
      }
    case 'EDIT_TASK':
      return {
        tasks: state.tasks.map((w) => w._id === action.payload._id ? action.payload : w)
      }
    case 'DELETE_TASK':
      return {
        tasks: state.tasks.filter((w) => w._id !== action.payload._id)
      }

    default:
      return state
  }
}

export const HomeTaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(homeTaskReducer, {
    tasks: null
  })

  return (
    <homeTaskContext.Provider value={{...state, dispatch}}>
      { children }
    </homeTaskContext.Provider>
  )
}