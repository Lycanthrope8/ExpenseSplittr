import { CreateHomeContext } from "../context/CreateHomeContext"
import { useContext } from "react"

export const usePersonalExpense = () => {
  const context = useContext(CreateHomeContext)

  if(!context) {
    throw Error('useCreateHomeContext must be used inside CreateHomeContextProvider')
  }
  return context
}