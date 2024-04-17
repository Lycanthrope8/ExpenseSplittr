
import { AnimatedCounter } from 'react-animated-counter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBangladeshiTakaSign } from '@fortawesome/free-solid-svg-icons';

const Spent = ({ weeklySum, monthlySum, highestSpentTag, highestSpentAmount }) => {


  return (
    <div className='col-span-3 grid grid-cols-3 gap-4 text-text h-[200px]'>
      <div className='p-8 flex flex-col justify-between border-1 border-border rounded-lg bg-gradient-to-bl from-blue-gray-800 via-blue-gray-900 to-blue-gray-900'>
        <h1 className='text-xl opacity-70 uppercase font-bison'>Total weekly expense</h1>
        <div className='flex ml-0 text-3xl text-text'>
          <div className='flex space-x-4 font-poppins'><FontAwesomeIcon icon={faBangladeshiTakaSign} />
            <AnimatedCounter
              value={weeklySum}
              delay={0}
              includeCommas={true}
              incrementColor='#00ff00'
              decrementColor='#ff0000'
              fontSize='36px'
              color='text-text' />
          </div>
        </div>
      </div>
      <div className='p-8 flex flex-col justify-between border-1 border-border rounded-lg bg-gradient-to-bl from-blue-gray-800 via-blue-gray-900 to-blue-gray-900'>
        <h1 className='text-xl opacity-70 uppercase font-bison'>Total monthly expense</h1>
        <div className='flex text-3xl text-text'>
          <div className='flex space-x-4 font-poppins'><FontAwesomeIcon icon={faBangladeshiTakaSign} />
            <AnimatedCounter
              value={monthlySum}
              delay={0}
              includeCommas={true}
              incrementColor='#00ff00'
              decrementColor='#ff0000'
              fontSize='36px'
              color='text-text' />
          </div>
        </div>
      </div>
      <div className='p-8 flex flex-col justify-between border-1 border-border rounded-lg bg-gradient-to-bl from-blue-gray-800 via-blue-gray-900 to-blue-gray-900'>
        <h1 className='text-xl opacity-70 uppercase font-bison'>Most Spent</h1>
        <div className='flex justify-between'>
          <h1 className='text-4xl'>{highestSpentTag}</h1>
          <div className='flex space-x-4 opacity-50 text-xl text-center font-poppins'>
            <span className='flex items-center'>
              <FontAwesomeIcon icon={faBangladeshiTakaSign} />
            </span>

            <AnimatedCounter
              value={highestSpentAmount}
              delay={0}
              includeCommas={true}
              incrementColor='#00ff00'
              decrementColor='#ff0000'
              fontSize='20px'
              color='text-text' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Spent