import React, { useState   } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import CircularProgress from '@mui/material/CircularProgress';

export const HomeLess = () => {
  const [enteredCode, setEnteredCode] = useState(false);
  const [codeText, setCodeText] = useState("");
  const navigate = useNavigate();


  const handleJoinClick = () => {
    setEnteredCode(!enteredCode);
  };

  const handleSeeDetails = () => {
    navigate(`/home/${codeText}`);
  };

  return (
    <div>
      <div className="p-8 flex items-center justify-evenly">
        <Link
          className="px-28 py-20 text-2xl font-bold bg-secondary text-text rounded-lg hover:opacity-90 hover:rounded-3xl transition-all ease-out duration-300"
          to="/home/createHome"
        >
          Create Home
        </Link>
        <button
          className="px-28 py-20 text-2xl font-bold bg-secondary text-text rounded-lg hover:opacity-90 hover:rounded-3xl transition-all ease-out duration-300"
          onClick={handleJoinClick}
        >
          Join Home
        </button>
        <Link
          className="px-28 py-20 text-2xl font-bold bg-secondary text-text rounded-lg hover:opacity-90 hover:rounded-3xl transition-all ease-out duration-300"
          to="/home/exploreHomes/"
        >
          Explore Homes
        </Link>
      </div>
      {enteredCode && (
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Enter Code"
            onChange={(e) => setCodeText(e.target.value)}
            className="w-60 mr-2 border-2 border-border bg-transparent text-text text-lg rounded-md p-2 focus:outline-none"
            required
          />
          <button
            onClick={handleSeeDetails}
            className="px-2 py-1 text-sm bg-secondary text-text text-secondary rounded-lg hover:opacity-80"
          >
            See Details
          </button>
        </div>
      )}
    </div>
  );
};
