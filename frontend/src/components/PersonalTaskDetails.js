import React from 'react';
import { usePersonalTask } from '../hooks/usePersonalTask';
import { useAuthContext } from '../hooks/useAuthContext';
import { format } from 'date-fns';

const TaskDetails = ({ task, onDelete }) => {
  const { dispatch } = usePersonalTask();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/personalTasks/' + task._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_TASK', payload: json });
      if (onDelete) {
        onDelete(task._id);
    }
    }
  };

  const formattedDate = format(new Date(task.createdAt), "MMMM dd, yyyy 'at' HH:mm");
  const formattedDeadline = format(new Date(task.deadline), "MMMM dd, yyyy");

  return (
    <div className="task-details flex justify-between text-white bg-secondary-dark-bg p-4 mb-4 rounded-2xl">
      <div className='flex flex-col'>
        <h4 className='text-3xl border-b-1 mb-2'>{task.title}</h4>
        <p className="text-lg mb-4"><strong>Description: </strong>{task.description}</p>
        <p className="text-lg mb-4"><strong>Deadline: </strong>{formattedDeadline}</p>
        <p className="text-lg mb-4"><strong>Completed: </strong>{task.completed ? 'Yes' : 'No'}</p>
        <p className="text-sm">{formattedDate}</p>
      </div>
      <span className="material-symbols-outlined text-3xl h-12 w-12 flex items-center justify-center rounded-full hover:cursor-pointer hover:bg-tertiary-dark-bg" onClick={handleClick}>delete</span>
    </div>
  );
};

export default TaskDetails;
