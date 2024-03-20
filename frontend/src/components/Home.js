
import React from 'react';
import { useNavigate } from "react-router-dom";
export const Home = (home) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log(home.home_id); 
    navigate(`/homedetails/DmsQTAMW`); //we have to implement the home_id
  };


    return (
        <div onClick={handleClick}>
            <h1>see Home details</h1>
        </div>
    )
}
