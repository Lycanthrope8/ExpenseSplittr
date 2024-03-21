import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
          className="px-28 py-16 text-2xl bg-accent text-zinc-800 rounded-lg hover:opacity-90 hover:rounded-3xl transition-all ease-out duration-300"
          to="/home/createHome"
        >
          Create Home
        </Link>
        <button
          className="px-28 py-16 text-2xl bg-accent text-zinc-800 rounded-lg hover:opacity-90 hover:rounded-3xl transition-all ease-out duration-300"
          onClick={handleJoinClick}
        >
          Join Home
        </button>
        <Link
          className="px-28 py-16 text-2xl bg-accent text-zinc-800 rounded-lg hover:opacity-90 hover:rounded-3xl transition-all ease-out duration-300"
          to="/home/exploreHomes/"
        >
          Explore Homes
        </Link>
      </div>
      {enteredCode && (
        <div className="flex justify-center space-2">
          <input
            type="text"
            placeholder="Enter Code"
            onChange={(e) => setCodeText(e.target.value)}
            className="mr-4 bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"
            required
          />
          <button
            onClick={handleSeeDetails}
            className="p-2 text-sm bg-accent text-zinc-800 rounded-lg hover:opacity-80"
          >
            See Details
          </button>
        </div>
      )}
    </div>
  );
};
