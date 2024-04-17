import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'

export const Admin = () => {
  const [data, setData] = useState([]);
  const { user } = useAuthContext()
  useEffect(() => {
    console.log('Fetching data...');
    const fetchData = async () => {
      try {
        const response = await fetch('/geteverything', {
            headers: { Authorization: `Bearer ${user.token}` }
          }); 
        if (response.ok) {
          const data = await response.json();
          console.log('Data fetched:', data);
          setData(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log('Rendered component with data:', data);

  return (
    <>
      <div className='text-3xl border-b-1 mb-2' style={{ height: '50px', overflowY: 'auto' }}>
        <h1 className="text-center">Admin Panel</h1>
      </div>
      <div className="text-center" style={{ height: '300px', overflowY: 'auto' }}>
        {/* Render data from all models */}
        {data.map((modelData, index) => (
          <div key={index} className='mb-4'>
            <h2 className='text-3xl border-b-1 mb-2'>Data from Model {index + 1}</h2>
            {Object.entries(modelData).map(([key, value]) => (
              <div key={key} className="expense-details flex justify-between text-white bg-secondary-dark-bg p-4 rounded-2xl">
                <div className='flex flex-col'>
                  <h4 className='text-3xl border-b-1 mb-2'>{key}</h4>
                  <pre>{JSON.stringify(value, null, 2)}</pre>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
