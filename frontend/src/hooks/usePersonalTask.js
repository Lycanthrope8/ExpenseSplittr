import { personalTaskContext } from "../context/PersonalTaskContext"
import { useContext } from "react"

export const usePersonalTask = () => {
  const context = useContext(personalTaskContext)

  if(!context) {
    throw Error('usePersonalTask must be used inside a PersonalTaskProvider')
  }
  return context
}