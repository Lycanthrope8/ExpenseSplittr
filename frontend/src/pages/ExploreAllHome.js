import React from 'react'
import ExploreHomeCard from '../components/ExploreHomeCard'
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'

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
        <p>Loading...</p>
      ) : (
        <div>
          {homes.map(home => (
            <ExploreHomeCard key={home._id} home={home} />
          ))}
        </div>
      )
    )};