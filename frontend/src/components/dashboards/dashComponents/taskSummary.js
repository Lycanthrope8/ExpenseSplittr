import moment from 'moment';
import { motion } from 'framer-motion';

const itemVariants = {
  open: i => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring",
    stiffness: 300,
    damping: 24,
    delay: i * 0.1
  }
  }),
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

export const TaskSummary = ({tasks}) => {
  return (
    <div className='col-span-1 p-8 text-text rounded-lg bg-transparent border-1 border-border h-[268px] overflow-hidden'>
      <h1 className='mb-4 text-3xl font-bold'>Task Summary</h1>

      
      {tasks && tasks.length > 0 ? <div className='h-full overflow-y-scroll no-scrollbar'>
      <motion.ul
        initial="closed"
        animate="open"
        variants={{
          open: {
            // clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05
            }
          },
          closed: {
            // clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3
            }
          }
        }}
        >
        {tasks && tasks.map((task, i) => (
          <motion.h3 custom={i} variants={itemVariants} key={task._id} className='p-2 mt-2 rounded-lg bg-transparent border-1 border-border flex justify-between'>
            <p><span className='text-slate-400'>৹</span> {task.title}</p>
            <p className='text-xs flex items-center rounded-lg bg-slate-400 px-2'>{moment(task.deadline).format('D/MM')}</p>
          </motion.h3>
        ))}
        </motion.ul>
      </div> : <p className='mt-10 text-lg text-center'>You have no pending task!</p>}
    </div>

    // <div className='col-span-1 p-8 rounded-3xl bg-[#b9c1b6]'>
    //   <h1 className='mb-8 text-3xl font-bold'>Task Summary</h1>
    //   <p className='p-2 mt-2 rounded-lg bg-[#D2E1F9]'><span className='text-slate-400'>৹</span> Task 1</p>
    //   <p className='p-2 mt-2 rounded-lg bg-[#D2F2F9]'><span className='text-slate-400'>৹</span> Task 2</p>
    //   <p className='p-2 mt-2 rounded-lg bg-[#D2F9E8]'><span className='text-slate-400'>৹</span> Task 3</p>
    // </div>
  )
};