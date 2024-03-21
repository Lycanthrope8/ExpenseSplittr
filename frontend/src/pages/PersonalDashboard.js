import { useEffect, useState } from 'react'
import { Personal } from '../components/Personal'
import { usePersonalExpense } from "../hooks/usePersonalExpense";


export const PersonalDashboard = () => {
  

  return (
    <div>
      <Personal />
    </div>
  )
}