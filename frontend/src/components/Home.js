
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../hooks/useProfileContext";
export const Home = () => {
  const navigate = useNavigate();
  const { profile } = useProfileContext();
  // console.log(profile);
  const handleClick = async () => {
    const homeId = await profile.home_id;
    // console.log(homeId);
    navigate(`/homedetails/${homeId}`); 
  };
  
    return (
        <div onClick={handleClick}>
            <h1>see Home details</h1>
        </div>
    )
}
