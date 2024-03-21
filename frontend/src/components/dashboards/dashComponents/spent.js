import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

const Spent = () => {
  const [expenses, setExpenses] = useState([]);
  const { user } = useAuthContext();
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
  }, []);

  return (
    <div className='col-span-2 grid grid-cols-2 gap-4'>
        <div className='p-8 flex flex-col justify-between rounded-3xl bg-[#b0d2c1]'>
            <h1 className='text-2xl font-bold'>Total weekly expense</h1>
            <p  className='text-6xl text-zinc-600'>৳{weeklySum}</p>
            {/* <p className='text-6xl text-zinc-600'>৳1487</p> */}
        </div>
        <div className='p-8 flex flex-col justify-between rounded-3xl bg-[#bab6c1]'>
            <h1 className='text-2xl font-bold'>Total monthly expense</h1>
            <p className='text-6xl text-zinc-600'>৳{monthlySum}</p>
        </div>
    </div>
  )
}

export default Spent