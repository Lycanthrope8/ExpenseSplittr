import  {ExploreAllHomeContext}  from "../context/ExploreAllHomeContext"
import { useContext } from "react"

export const useExploreAllHome = () => {
  const context = useContext(ExploreAllHomeContext)

  if(!context) {
    throw Error('useExploreAllHome must be used inside a ExploreAllHomeContextProvider')
  }
  return context
}