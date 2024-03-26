import { useContext } from "react"
import { HomeContext } from "../context/HomeContext"

export const useHomeContext = () => {
  const context = useContext(HomeContext)

  if(!context) {
    throw Error('useHomeContext must be used inside an HomeContextProvider')
  }

  return context
}
