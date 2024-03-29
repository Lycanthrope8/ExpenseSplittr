// Profile.js

import React, { useState, useContext, useEffect } from 'react';
import ProfileForm from '../components/ProfileForm';
import ProfilePicture from '../components/ProfilePicture';
import { ProfileContext } from '../context/ProfileContext';
import CircularProgress from '@mui/material/CircularProgress';

const Profile = () => {
  const { profile } = useContext(ProfileContext);
  const [loading, setLoading] = useState(true);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  useEffect(() => {
    if (profile) {
      setLoading(false);
      setProfilePictureUrl(profile.avatar || 'http://localhost:4000/uploads/profilePictures/default.jpg');
    }
  }, [profile]);

  if (loading) {
    return <div className='flex h-screen items-center'>
    <p className='flex w-40 mx-auto font-2xl bg-slate-200 p-4 rounded-lg '>
    <CircularProgress className="mr-4" />
    Loading...</p>
  </div>;
  }

  const handlePictureChange = (newPictureUrl) => {
    setProfilePictureUrl(newPictureUrl);
  };

  return (
    <>
      <h1 className="block text-center text-text font-bold text-4xl mb-20">Profile Page</h1>
      <div className='flex sm:flex-col lg:flex-row w-full items-center justify-evenly text-text'>
        <div className='rounded-lg size-96'>
          <ProfilePicture imageUrl={profilePictureUrl} />
        </div>
        <ProfileForm onPictureChange={handlePictureChange} />
      </div>
    </>
  );
};

export default Profile;
