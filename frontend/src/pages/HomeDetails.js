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
    <h1>Home Detail for ID: {id}</h1>
  )
}
