import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/geteverything'); 
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        {data.map((modelData, index) => (
          <div key={index}>
            <h2>Data from Model {index + 1}</h2>
            <pre>{JSON.stringify(modelData, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
