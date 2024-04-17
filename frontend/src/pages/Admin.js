import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export const Admin = () => {
  const [data, setData] = useState([]);
  const [activeModel, setActiveModel] = useState(null);
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

  const getModelDescription = (index) => {
    switch (index) {
      case 0:
        return 'Users Information';
      case 1:
        return 'Users Login Info';
      case 2:
        return 'Personal Task';
      case 3:
        return 'Personal Expense';
      case 4:
        return 'Home Task';
      case 5:
        return 'Home Expense';
      case 6:
        return 'Home Information';
      case 7:
        return 'Debtor Creditor';
      default:
        return '';
    }
  };

  const toggleModel = (index) => {
    setActiveModel(activeModel === index ? null : index);
  };

  return (
    <div>
      <h1 className="text-center text-3xl mt-4 mb-8">Admin Panel</h1>
      <div className="container mx-auto">
        {/* Render data from all models */}
        {data.map((modelData, index) => (
          <div key={index} className='mb-4'>
            <h2 className='text-2xl border-b-2 cursor-pointer' style={{color: 'white' }} onClick={() => toggleModel(index)}>{getModelDescription(index)}</h2>
            {activeModel === index && (
              <div className="model-data mt-4">
                {modelData.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-4">
                    {Object.entries(item).map(([key, value]) => (
                      <div key={key} style={{ backgroundColor: 'silver' }}>
                      <p className='text-lg'>
                     <span className='font-bold'>{key}: </span>{value}
                      </p>
                      </div>

                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


