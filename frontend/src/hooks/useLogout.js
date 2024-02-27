import { useAuthContext } from './useAuthContext'
import { usePersonalExpense } from './usePersonalExpense'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: expensesDispatch } = usePersonalExpense()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    expensesDispatch({ type: 'SET_EXPENSES', payload: null})
  }

  return { logout }
}