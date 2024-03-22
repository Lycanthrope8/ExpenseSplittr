import React from 'react';
import { usePersonalTask } from '../hooks/usePersonalTask';
import { useAuthContext } from '../hooks/useAuthContext';
import { format } from 'date-fns';
import moment from 'moment';

const TaskDetails = ({ task, onDelete, onEdit }) => {
  const { dispatch } = usePersonalTask();
  const { user } = useAuthContext();

  const handleEdit = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/personalTasks/' + task._id, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'EDIT_TASK', payload: json });
      if (onEdit) {
        onEdit(task._id);
    }
    }
  };

  const handleDelete = async () => {
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
  // const formattedDeadline = moment().format('MMMM Do YYYY, h:mm:ss a');
  const formattedDeadline = moment(task.deadline).calendar();
  const momentTime = moment(task.deadline).format('ddd MMM D YYYY HH:mm:ss');
  // const formattedDeadline = moment(task.deadline, "YYYYMMDD").fromNow();
  
  return (
    <div className="task-details flex justify-between text-white bg-secondary-dark-bg p-4 mb-4 rounded-2xl">
      <div className='flex flex-col w-full'>
        <h4 className='text-3xl border-b-1 mb-2'>{task.title}</h4>
        <p className="text-lg mb-4">{task.description}</p>
        {new Date(momentTime).getTime() < new Date().getTime() ?
          <p className='text-lg mb-4 text-red-400'>Overdue: {formattedDeadline}</p> :
          <p className='text-lg mb-4'>Due: {formattedDeadline}</p>}
        <div className='flex justify-between'>
          <p className="text-lg mb-4"><strong>Completed: </strong>{task.completed ? 'Yes' : 'No'}</p>
          <p className="text-sm">{formattedDate}</p>
        </div>
      </div>
      <span className="material-symbols-outlined text-3xl h-12 w-12 flex items-center justify-center rounded-full hover:cursor-pointer hover:bg-tertiary-dark-bg" onClick={handleEdit}>edit</span>
      <span className="material-symbols-outlined text-red-500 text-3xl h-12 w-12 flex items-center justify-center rounded-full hover:cursor-pointer hover:bg-tertiary-dark-bg " onClick={handleDelete}>delete</span>
    </div>
  );
};

export default TaskDetails;
