import React, { useState, useEffect } from 'react';
import AdminShowHomes from '../components/admin/AdminShowHomes';

export const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user/getalluser'); 
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
     <div className='text-3xl border-b-1 mb-2' style={{ height: '50px', overflowY: 'auto' }}>
    <h1 className="text-center">Admin panel</h1>
    </div>
      <div className="text-center" style={{ height: '300px', overflowY: 'auto' }}>
        <h2 className='text-3xl border-b-1 mb-2'>All Users</h2>
        {users.map(user => (
          <div key={user._id} className="expense-details flex justify-between text-white bg-secondary-dark-bg p-4 mb-4 rounded-2xl">
            <div className='flex flex-col'>
              <h4 className='text-3xl border-b-1 mb-2'>{user.email}</h4>
            </div>
            <span className="material-symbols-outlined text-3xl h-12 w-12 flex items-center justify-center rounded-full hover:cursor-pointer hover:bg-tertiary-dark-bg" >delete</span>
          </div>
        ))}
      </div>
      
      <div className="text-center" style={{ height: '300px', overflowY: 'auto' }}>
        <h2 className='text-3xl border-b-1 my-8'>All Homes</h2>
        <AdminShowHomes />
      </div>
    </>
  );
};