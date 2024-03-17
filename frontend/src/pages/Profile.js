// Profile.js

import React, { useState, useContext, useEffect } from 'react';
import ProfileForm from '../components/ProfileForm';
import ProfilePicture from '../components/ProfilePicture';
import { ProfileContext } from '../context/ProfileContext';

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
    return <div>Loading...</div>;
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
