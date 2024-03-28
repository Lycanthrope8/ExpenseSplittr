import React, { useState, useEffect } from 'react'
import {TaskSummary} from './dashComponents/taskSummary'
import { useAuthContext } from '../../hooks/useAuthContext'
import {useProfileContext} from '../../hooks/useProfileContext'
import Spent from './dashComponents/spent'

const HomeDashboard = () => {
  const [ tasks, setTasks ] = useState(null);
  const [ expenses, setExpenses ] = useState([]);
  const { user } = useAuthContext();
  const { profile } = useProfileContext();

  const [weeklySum, setWeeklySum] = useState(0);
  const [monthlySum, setMonthlySum] = useState(0);

  useEffect(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    const lastWeekExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.createdAt);
      return expenseDate >= oneWeekAgo;
    });

    const lastMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.createdAt);
      return expenseDate >= oneMonthAgo;
    });

    let weekSum = lastWeekExpenses.reduce((a, b) => a + b.amount, 0);
    let monthSum = lastMonthExpenses.reduce((a, b) => a + b.amount, 0);
    setWeeklySum(weekSum);
    setMonthlySum(monthSum);
  }, [expenses]);

  useEffect(() => {
    // dispatchEvent({type: "TOTAL_EXPENSES"});
    const fetchExpenses = async () => {
      const res = await fetch(`/api/homeExpenses/${profile.homeId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await res.json();
      if (res.ok) {
        setExpenses(json);
      } else {
        console.log(json.error);
      }
    }

    fetchExpenses();
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`/api/homeTasks/${profile.homeId}`, {

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
  }, [profile.homeId, setTasks, user]);

  return (
    <div className='border-2 border-border rounded-xl p-2'>
        <h1 className='mb-4 font-bold text-text text-center text-4xl'>Home Dashboard</h1>
        <div className='grid grid-cols-3 gap-8 px-16'>
            <TaskSummary tasks={tasks} />
            <Spent weeklySum={weeklySum} monthlySum={monthlySum}/>
        </div>
    </div>
  )
}


export default HomeDashboard