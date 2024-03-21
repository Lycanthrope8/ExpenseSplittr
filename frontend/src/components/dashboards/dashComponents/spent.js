import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

const Spent = () => {
  const [expenses, setExpenses] = useState([]);
  const { user } = useAuthContext();
  let sum = expenses.reduce((a, b) => a + b.amount, 0);
  
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
            <p  className='text-6xl text-zinc-600'>৳{sum}</p>
            {/* <p className='text-6xl text-zinc-600'>৳1487</p> */}
        </div>
        <div className='p-8 flex flex-col justify-between rounded-3xl bg-[#bab6c1]'>
            <h1 className='text-2xl font-bold'>Total monthly expense</h1>
            <p className='text-6xl text-zinc-600'>৳12, 467</p>
        </div>
    </div>
  )
}

export default Spent