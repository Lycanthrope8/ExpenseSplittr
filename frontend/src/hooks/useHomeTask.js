import { homeTaskContext } from "../context/HomeTaskContext"
import { useContext } from "react"

export const useHomeTask = () => {
  const context = useContext(homeTaskContext)

  if(!context) {
    throw Error('useHomeTask must be used inside a HomeTaskProvider')
  }
  return context
}