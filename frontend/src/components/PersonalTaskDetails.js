import { useState } from 'react';
import { usePersonalTask } from '../hooks/usePersonalTask';
import { useAuthContext } from '../hooks/useAuthContext';
import { format } from 'date-fns';
import moment from 'moment';

const TaskDetails = ({ task, onDelete, onEdit }) => {
  const { dispatch } = usePersonalTask();
  const { user } = useAuthContext();
  const [completeStatus, setCompleteStatus] = useState(task.completed);
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState();
  const [newDescription, setNewDescription] = useState();
  const [newDeadline, setNewDeadline] = useState();

  

  const changeCompleteStatus = async () => {
    if (!user) {
      return;
    }

    completeStatus ? setCompleteStatus(false) : setCompleteStatus(true);

    const response = await fetch('/api/personalTasks/' + task._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ completed: !task.completed })
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'EDIT_TASK', payload: json });
    }
  };



  const handleEdit = async () => {
    if (!user) {
      return;
    }
    const response = await fetch('/api/personalTasks/' + task._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ title: newTitle, description: newDescription, deadline: newDeadline })
    });
    const json = await response.json();
    
    if (response.ok) {
      dispatch({ type: 'EDIT_TASK', payload: json });
      if (onEdit) {
        onEdit(json);
        console.log('editing done');
      }
      setEditing(false);
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


  const editingTemplate = (
    <>
      <form id="editingForm" className='flex w-full' onSubmit={handleEdit}>
        <div className='flex flex-col flex-1'>
        <input className='text-3xl mb-2 border-b-1 bg-secondary-dark-bg text-zinc-200 outline-none' placeholder={task.title} onChange={(e) => setNewTitle(e.target.value)}/>
        <input className="text-lg mb-4 bg-secondary-dark-bg text-zinc-200 outline-none" placeholder={task.description} onChange={(e) => setNewDescription(e.target.value)}/>
        <input type="date" className='text-lg mb-4 bg-secondary-dark-bg text-zinc-200' placeholder={task.deadline} onChange={(e) => setNewDeadline(e.target.value)}/>
        <div className='flex justify-between items-center'>
          <button onClick={changeCompleteStatus} className={completeStatus ? 'text-gray-800 align-middle px-4 py-2 rounded-xl bg-green-300' : 'text-gray-800 align-middle px-4 py-2 rounded-xl bg-red-300'}>{completeStatus ? 'Completed' : 'Incomplete'}</button>
          <p className="text-sm">Created: {formattedDate}</p>
        </div>
        </div>
        <div className='flex'>
        <button form='editingForm' className="basis-2/12 material-symbols-outlined text-3xl h-12 w-12 flex items-center justify-center rounded-full hover:cursor-pointer hover:bg-tertiary-dark-bg" type='submit'>save</button>
        <button className="material-symbols-outlined text-text text-3xl h-12 w-12 flex items-center justify-center rounded-full hover:cursor-pointer hover:text-red-300 hover:bg-secondary " onClick={handleDelete}>delete</button>
        </div>
      </form>
    </>  
  );
  const viewTemplate = (
    <>
      <div className='flex flex-col w-full'>
        <h4 className='text-3xl border-b-1 mb-2'>{task.title}</h4>
        <p className="text-lg mb-4">{task.description}</p>
        {new Date(momentTime).getTime() < new Date().getTime() ?
          <p className='text-lg mb-4 text-red-400'>Overdue: {formattedDeadline}</p> :
          <p className='text-lg mb-4'>Due: {formattedDeadline}</p>}
        <div className='flex justify-between items-center'>
          {/* <p className="text-lg mb-4"><strong>Completed: </strong>{task.completed ? 'Yes' : 'No'}</p> */}
          <button onClick={changeCompleteStatus} className={task.completed ? 'text-text align-middle px-4 py-2 border-1 border-green-300 rounded-md hover:shadow-[inset_0_0_6px_0_rgba(0,0,0,0.05)] hover:shadow-green-300 transition-shadow' : 'text-text align-middle px-4 py-2 border-1 border-red-300 rounded-md hover:shadow-[inset_0_0_6px_0_rgba(0,0,0,0.05)] hover:shadow-red-300 transition-shadow'}>{task.completed ? 'Completed' : 'Incomplete'}</button>
          <p className="text-sm">Created: {formattedDate}</p>
        </div>
      </div>
      <button className="material-symbols-outlined text-3xl h-12 w-12 flex items-center justify-center rounded-full hover:cursor-pointer hover:bg-tertiary-dark-bg" onClick={() => setEditing(true)}>edit</button>
      <button className="material-symbols-outlined text-text text-3xl h-12 w-12 flex items-center justify-center rounded-full hover:cursor-pointer hover:text-red-300 hover:bg-secondary " onClick={handleDelete}>delete</button>
    </>
  );
  
  return (
    <div className="flex justify-between text-text p-4 rounded-lg">
        {isEditing ? editingTemplate : viewTemplate}
    </div>
  );
};

export default TaskDetails;
