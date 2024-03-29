
import { AnimatedCounter } from  'react-animated-counter';

const Spent = ({weeklySum, monthlySum}) => {
  
  
  return (
    <div className='col-span-2 grid grid-cols-2 gap-8 text-text'>
        <div className='p-8 flex flex-col justify-between border-1 border-border rounded-lg bg-transparent'>
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
                  color='text-text'/>
              </div>
            </div>
        </div>
        <div className='p-8 flex flex-col justify-between border-1 border-border rounded-lg bg-transparent'>
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
                  color='text-text'/>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Spent