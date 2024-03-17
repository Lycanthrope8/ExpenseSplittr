import React from 'react';
import CreateHomeForm from '../components/CreateHomeForm';
import { CreateHomeContextProvider } from '../context/CreateHomeContext';

export const CreateHome = () => {
  return (
    <CreateHomeContextProvider>
      <CreateHomeForm />
    </CreateHomeContextProvider>
  )
}
