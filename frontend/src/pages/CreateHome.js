import React from 'react';
import CreateHomeForm from '../components/CreateHomeForm';
import { useProfileContext } from "../hooks/useProfileContext";
import { CreateHomeContextProvider } from '../context/CreateHomeContext';



export const CreateHome = () => {
  const { profile } = useProfileContext();

  // Check if any required fields in the profile are empty
  const isProfileIncomplete = !profile.address || !profile.age || !profile.gender || !profile.name || !profile.phone || !profile.userId;

  return (
    <CreateHomeContextProvider>
      {isProfileIncomplete ? (
        <div>
          <p className='flex h-screen text-text text-4xl justify-center items-center'>Complete your profile before creating home.</p>

        </div>
      ) : (
        <CreateHomeForm />
      )}
    </CreateHomeContextProvider>
  )
}
