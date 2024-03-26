import React, { useEffect, useState } from 'react';
import {TaskSummary} from './dashComponents/taskSummary'
import { useAuthContext } from '../../hooks/useAuthContext'
import Spent from './dashComponents/spent'

const PersonalDashboard = () => {
  const [ tasks, setTasks ] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/personalTasks", {

        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        // dispatch({ type: "SET_TASKS", payload: json });
        setTasks(json);
      }
    };
    if (user) {
      fetchTasks();
    }
  }, [setTasks, user]);

  return (
    <div className='border-1 border-slate-400 border-opacity-40 rounded-xl p-2'>
        <h1 className='mb-4 font-bold text-gray-400 text-center text-4xl'>Personal Dashboard</h1>
        <div className='grid grid-cols-3 gap-8 px-16'> 
            <TaskSummary tasks={tasks}/>
            <Spent />
        </div>
    </div>
  )
}


export default PersonalDashboard