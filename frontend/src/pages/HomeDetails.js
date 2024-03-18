import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'


export const HomeDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [home, setHome] = useState([]); // Add this line
    const { user } = useAuthContext()
    useEffect(() => {
        const fetchhome = async () => {
          try {
            console.log(id)
            const response = await fetch(`/home/${id}`, {
              headers: { Authorization: `Bearer ${user.token}` }
            })
            const json = await response.json()
            
  
            if(response.ok){
              console.log(json)
              setHome(json); // Update home state
              setLoading(false)
            }
          } catch (error) {
            console.error(error)
            setLoading(false) // Ensure loading is set to false even if there is an error
          }
        }
        if(user){
          fetchhome()
        }
      }, [user]);



  return (
    <div className="expense-details flex justify-between text-white bg-secondary-dark-bg p-4 mb-4 rounded-2xl">
    <div className='flex flex-col'>
      <h4 className='text-3xl border-b-1 mb-2'>{home.name}</h4>
      <p className="text-lg mb-4"><strong>Location: </strong>{home.location}</p>
      <p className="text-lg mb-4"><strong>Accommodation Type: </strong>{home.accommodationType}</p>
      <p className="text-lg mb-4"><strong>Bedrooms: </strong>{home.bedrooms}, <strong>Bathrooms: </strong>{home.bathrooms}</p>
      <p className="text-lg mb-4"><strong>Rent Amount: </strong>${home.rentAmount}</p>
      <p className="text-lg mb-4"><strong>Utilities Included: </strong>{home.utilitiesIncluded ? 'Yes' : 'No'}</p>
      <p className="text-lg mb-4"><strong>Move In Date: </strong>{new Date(home.moveInDate).toLocaleDateString()}</p>
      {home.images && home.images.length > 0 && (
        <div>
          {home.images.map((image, index) => (
            <img key={index} src={image} alt={`Home ${home.name}`} style={{ maxWidth: '100px', marginRight: '10px', border: 'none', margin: '0', padding: '0' }} />
          ))}
        </div>
      )}
    </div>
    <div className="grid grid-cols-2">
    <button className='rounded-xl text-center p-2 hover:text-main-dark-bg hover:bg-zinc-200'>Join Home</button>
    </div>
  </div>
  
  
  )
}