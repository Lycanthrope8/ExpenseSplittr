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
    <div>
      <h1 className="block text-center text-zinc-100 text-2xl ml-0">Profile Page</h1>
      <ProfilePicture imageUrl={profilePictureUrl} />
      <ProfileForm onPictureChange={handlePictureChange} />
    </div>
  );
};

export default Profile;
