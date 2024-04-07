import { useContext } from "react"
import { DebtCreditContext } from "../context/DebtCreditContext"

export const useDebtCreditContext = () => {
  const context = useContext(DebtCreditContext)

  if(!context) {
    throw Error('useDebtCreditContext must be used inside an DebtCreditContextProvider')
  }

  return context
}
