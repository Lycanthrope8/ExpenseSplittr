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
  const [homeSwitch, setHomeSwitch] = useState(true);

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
      <button
        className="absolute z-50 bg-red-300 px-4 py-2 rounded-md"
        onClick={() => setHomeSwitch((prev) => !prev)}
      >
        {homeSwitch ? "Switch to Profile" : "Switch to Home"}
      </button>
      <div className="h-screen">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {!homeSwitch ? (
              <div
                onClick={handleProfileDashboardClick}
                className={`transition-all`}
              >
                <PersonalDashboard />
              </div>
            ) : (
              <div>
                {profile.homeId ? (
                  <div
                    onClick={handleHomeLessClick}
                    className={`transition-all`}
                  >
                    <HomeDashboard />
                  </div>
                ) : (
                  <div>
                    <HomeLess />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default LandingPage;
