import { CreateHomeContext } from "../context/CreateHomeContext"
import { useContext } from "react"

export const useCreateHomeContext = () => {
  const context = useContext(CreateHomeContext)

  if(!context) {
    throw Error('useCreateHomeContext must be used inside CreateHomeContextProvider')
  }
  return context
}