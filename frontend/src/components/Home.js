import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";

export const Home = () => {
  const { user } = useAuthContext();
  const { profile } = useProfileContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && profile) {
      setLoading(false);
    }
  }, [user, profile]);

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
              <Link to="/home/createHome">Create a home</Link>
              <button>Join</button>
              <button>Explore</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
