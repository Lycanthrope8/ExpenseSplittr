// ProfileContext.js

import React, { createContext, useReducer, useEffect } from 'react';

export const ProfileContext = createContext();

export const profileReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return { profile: action.payload };
    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};

export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, {
    profile: null
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`/profile/${user.userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const profileData = await response.json();
        dispatch({ type: 'SET_PROFILE', payload: profileData });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
