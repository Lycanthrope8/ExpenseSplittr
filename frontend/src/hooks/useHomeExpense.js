import { HomeExpenseContext } from "../context/HomeExpenseContext"
import { useContext } from "react"

export const useHomeExpense = () => {
  const context = useContext(HomeExpenseContext)

  if(!context) {
    throw Error('useHomeExpense must be used inside a HomeExpenseProvider')
  }
  return context
}