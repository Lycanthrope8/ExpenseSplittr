import React from 'react'
import {TaskSummary} from './dashComponents/taskSummary'
import Spent from './dashComponents/spent'

const HomeDashboard = () => {
  return (
    <div className='border-1 border-slate-400 border-opacity-40 rounded-xl p-2'>
        <h1 className='mb-4 font-bold text-slate-400 text-center text-4xl'>Home Dashboard</h1>
        <div className='grid grid-cols-3 gap-8 px-16'>
            <TaskSummary />
            <Spent />
        </div>
    </div>
  )
}


export default HomeDashboard