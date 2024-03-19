import React from 'react'
import TaskSummary from './dashComponents/taskSummary'
import Spent from './dashComponents/spent'

const HomeDashboard = () => {
  return (
    <div className='grid grid-cols-3 gap-4 px-16'>
        <TaskSummary />
        <Spent />

    </div>
  )
}


export default HomeDashboard