import { personalExpenseContext } from "../context/PersonalExpenseContext"
import { useContext } from "react"

export const usePersonalExpense = () => {
  const context = useContext(personalExpenseContext)

  if(!context) {
    throw Error('usePersonalExpense must be used inside a PersonalExpenseProvider')
  }
  return context
}