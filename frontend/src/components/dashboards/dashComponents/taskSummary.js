import moment from 'moment';


export const TaskSummary = ({tasks}) => {
  return (
    <div className='col-span-1 p-8 rounded-3xl bg-[#b9c1b6] h-[268px] overflow-hidden'>
      <h1 className='mb-4 text-3xl font-bold bg-[#b9c1b6]'>Task Summary</h1>
      {tasks && tasks.length > 0 ? <div className='h-full overflow-y-scroll no-scrollbar'>
        {tasks && tasks.map((task) => (
          <h3 key={task._id} className='p-2 mt-2 rounded-lg bg-[#D2E1F9] flex justify-between'>
            <p><span className='text-slate-400'>৹</span> {task.title}</p>
            <p className='text-xs flex items-center rounded-3xl bg-slate-400 px-2'>{moment(task.deadline).format('D/MM')}</p>
          </h3>
        ))}
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