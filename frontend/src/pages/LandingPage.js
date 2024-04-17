import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";
import PersonalDashboard from "../components/dashboards/PersonalDashboard";
import HomeDashboard from "../components/dashboards/HomeDashBoard";
import { HomeLess } from "../components/HomeLess";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { user } = useAuthContext();
  const { profile } = useProfileContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && profile) {
      setIsLoading(false);
    }
  }, [user, profile]);

  const handleProfileDashboardClick = () => {
    navigate("/personalDashboard");
  };

  const handleHomeLessClick = () => {
    navigate("/homeDashboard");
  };

  return (
    <>
    
    <div className="grid grid-rows-2 gap-8">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div onClick={handleProfileDashboardClick}>
            <PersonalDashboard />
          </div>
          {profile.homeId ? (
            <div onClick={handleHomeLessClick}>
              <HomeDashboard />
            </div>
          ) : (
            <div>
              <HomeLess />
            </div>
          )}
        </>
      )}
    </div>
    </>
  );
};

export default LandingPage;
