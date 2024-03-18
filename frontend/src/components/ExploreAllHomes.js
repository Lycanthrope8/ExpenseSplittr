import { useState , useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { format } from 'date-fns';

const HomeList = ({ homes }) => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext()

  useEffect(() => {
    try{
      const fetchHomes = async () => {
        const response = await fetch('/home/all', {
          headers: { Authorization: `Bearer ${user.token}` }
        })
        const json = await response.json()

        if(response.ok){
          setLoading(false)
          console.log(json)
        }
      }
      if(user){
        fetchHomes()
      }
    } catch (error) {
      console.log(error)
    }
    const fetchHomes = async () => {
      const response = await fetch("/home/all", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        setLoading(false);
        console.log(json)
      }
    };
    if (user) {
      fetchHomes();
    }
  }, []);


  return (
    <div className="expense-details flex justify-between text-white bg-secondary-dark-bg p-4 mb-4 rounded-2xl">

      <div className='flex flex-col'>
        
      </div>
      
    </div>
  )
}

export default HomeList
