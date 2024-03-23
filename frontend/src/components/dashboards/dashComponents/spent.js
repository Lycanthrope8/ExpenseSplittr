import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { AnimatedCounter } from  'react-animated-counter';

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
  });

  return (
    <div className='col-span-2 grid grid-cols-2 gap-8'>
        <div className='p-8 flex flex-col justify-between rounded-3xl bg-[#b0d2c1]'>
            <h1 className='text-3xl font-bold'>Total weekly expense</h1>
            <div className='flex ml-0 text-5xl text-zinc-600'>
              <div className='flex space-x-4'><span>৳</span>
                <AnimatedCounter
                  value={weeklySum}
                  delay={0}
                  includeCommas={true}
                  incrementColor='#00ff00'
                  decrementColor='#ff0000'
                  fontSize='48px'
                  color='#52525b'/>
              </div>
            </div>
        </div>
        <div className='p-8 flex flex-col justify-between rounded-3xl bg-[#bab6c1]'>
          <h1 className='text-3xl font-bold'>Total monthly expense</h1>
          <div className='flex text-5xl text-zinc-600'>
              <div className='flex space-x-4'><span>৳</span>
                <AnimatedCounter
                  value={monthlySum}
                  delay={0}
                  includeCommas={true}
                  incrementColor='#00ff00'
                  decrementColor='#ff0000'
                  fontSize='48px'
                  color='#52525b'/>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Spent