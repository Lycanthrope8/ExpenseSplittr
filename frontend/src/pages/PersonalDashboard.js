// import { useEffect, useState } from 'react'
import { Personal } from '../components/Personal';
import { PersonalTasks } from '../components/PersonalTasks';
// import { usePersonalExpense } from "../hooks/usePersonalExpense";


export const PersonalDashboard = () => {
  
  return (
    <div className='flex flex-row space-y-10'>
      <Personal />
      <PersonalTasks />
    </div>
  )
}