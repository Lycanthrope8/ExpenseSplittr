import React, { useEffect, useState } from 'react';
import { TaskSummary } from './dashComponents/taskSummary'
import { Graph } from './dashComponents/Graph'
import { useAuthContext } from '../../hooks/useAuthContext'
import Spent from './dashComponents/spent'

const PersonalDashboard = () => {
  const [ tasks, setTasks ] = useState(null);
  const [ expenses, setExpenses ] = useState([]);
  const { user } = useAuthContext();
  
  const [weeklySum, setWeeklySum] = useState(0);
  const [monthlySum, setMonthlySum] = useState(0);

  const [highestSpentTag, setHighestSpentTag] = useState('');
  const [highestSpentAmount, setHighestSpentAmount] = useState(0);

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

    setHighestSpentAmount((expenses.reduce((a, b) => a.amount > b.amount ? a : b, 0)).amount);
    setHighestSpentTag((expenses.reduce((a, b) => a.amount > b.amount ? a : b, 0)).tag);
  }, [expenses]);

  useEffect(() => {
    // dispatchEvent({type: "TOTAL_EXPENSES"});
    const fetchExpenses = async () => {
      const res = await fetch('/api/personalExpenses', {
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
    <div className='p-2'>
        {/* <h1 className='mb-4 font-bold text-text text-center text-4xl'>Personal Dashboard</h1> */}
        <div className='grid grid-cols-3 gap-8 px-16'> 
            <Spent weeklySum={weeklySum} monthlySum={monthlySum} highestSpentTag={highestSpentTag} highestSpentAmount={highestSpentAmount}/>
            <Graph expenses={expenses}/>
            <TaskSummary tasks={tasks}/>
        </div>
    </div>
  )
}


export default PersonalDashboard