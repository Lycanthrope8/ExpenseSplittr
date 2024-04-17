import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export const Admin = () => {
  const [data, setData] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/admin/geteverything', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user.token]);

  return (
    <>
      <div className='text-3xl border-b-1 mb-2'>
        <h1 className="text-center">Admin Panel</h1>
      </div>
      <div className="text-center" >
        {/* Render data from all models */}
        {data.map((modelData, index) => (
          <div key={index} className='mb-4'>
            <h2 className='text-3xl border-b-1 mb-2'>Data from Model {index + 1}</h2>
            {modelData.map((item, itemIndex) => (
              <div key={itemIndex} className="expense-details flex justify-between text-white bg-secondary-dark-bg p-4 rounded-2xl">
                <div className='flex flex-col'>
                  {Object.entries(item).map(([key, value]) => (
                    <div key={key}>
                      <h4 className='text-3xl border-b-1 mb-2'>{key}</h4>
                      <pre>{JSON.stringify(value, null, 2)}</pre>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

