
// import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../hooks/useProfileContext";
import { useAuthContext } from "../hooks/useAuthContext";

export const Home = () => {
  const navigate = useNavigate();
  const { profile } = useProfileContext();
  const { user } = useAuthContext();
  // const [isOwner, setIsOwner] = useState(false);
  
  const handleClick = async () => {
    const homeId = await profile.homeId;
    
    try {
      const response = await fetch(`/home/${homeId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        
        if (json.owner_id === user.userId) { // Check if the user is the owner of the home
          navigate(`/homedetailsOwner/${homeId}`);
        } else {
          navigate(`/homedetails/${homeId}`); 
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div onClick={handleClick}>
      <h1>See Home details</h1>
    </div>
  );
};
