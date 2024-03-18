import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const { user } = useAuthContext();
  const { profile } = useProfileContext();
  const [loading, setLoading] = useState(true);
  const [enteredCode, setEnteredCode] = useState(false);
  const [codeText, setCodeText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user && profile) {
      setLoading(false);
    }
  }, [user, profile]);

  const handleJoinClick = () => {
    setEnteredCode(!enteredCode);
  };

  const handleSeeDetails = () => {
    navigate(`/home/${codeText}`);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {profile.homeId ? (
            <h1>You are in a home</h1>
          ) : (
            <>
              <Link to="/home/createHome">Create</Link>
              <button onClick={handleJoinClick}>Join</button>
              <Link to="/home/exploreHomes/">Explore</Link>
              {enteredCode && (
                <div>
                  <input type="text" placeholder="Enter details" onChange={(e) => setCodeText(e.target.value)}/>
                  <button onClick={handleSeeDetails}>See Details</button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
