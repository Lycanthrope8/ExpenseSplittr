import React from 'react'
import ExploreHomeCard from '../components/ExploreHomeCard'
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'
import CircularProgress from '@mui/material/CircularProgress';

export const ExploreAllHome = () => {
    const [loading, setLoading] = useState(true);
    const [homes, setHomes] = useState([]); // Add this line
    const { user } = useAuthContext()

    useEffect(() => {
      const fetchHomes = async () => {
        try {
          const response = await fetch('/home/all', {
            headers: { Authorization: `Bearer ${user.token}` }
          })
          const json = await response.json()

          if(response.ok){
            // console.log(json)
            setHomes(json); // Update homes state
            setLoading(false)
          }
        } catch (error) {
          console.error(error)
          setLoading(false) // Ensure loading is set to false even if there is an error
        }
      }
      if(user){
        fetchHomes()
      }
    }, [user]);

    // if(loading) return <div>Loading...</div>;

    return (
      loading ? (
        <div className='flex h-screen items-center'>
          <p className='flex items-center w-40 mx-auto font-2xl bg-slate-200 p-4 rounded-lg '>
          <CircularProgress className="mr-4" />
          Loading...</p>
        </div>
          
      ) : (
        <div>
          {homes.map(home => (
            <ExploreHomeCard key={home._id} home={home} />
          ))}
        </div>
      )
    )};