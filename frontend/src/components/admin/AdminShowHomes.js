import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom"; 
const AdminShowHomes = () => {
  const [loading, setLoading] = useState(true);
  const [homes, setHomes] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchHomes = async () => {
      try {
        if (user) { 
          const response = await fetch('/home/all', {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          const json = await response.json();

          if (response.ok) {
            setHomes(json);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchHomes(); 

  }, [user]); 

  const handleClick = (homeId) => () => { 
    console.log(homeId);
    navigate(`/home/${homeId}`);
  };

  return (
    loading ? (
      <div className='flex h-screen items-center'>
        <p className='flex items-center w-40 mx-auto font-2xl bg-slate-200 p-4 rounded-lg '>
          <CircularProgress className="mr-4" />
          Loading...
        </p>
      </div>
    ) : (
      <div>
        {homes.map(home => (
          <div
            key={home._id}
            className="expense-details flex justify-between text-white bg-secondary-dark-bg p-4 mb-4 rounded-2xl"
          >
            <div onClick={handleClick(home._id)}> 
              <h2>Home Name: {home.name}</h2>
              <h2>Location: {home.location}</h2>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default AdminShowHomes;
