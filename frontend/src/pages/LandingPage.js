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

  const handleChatClick = () => {
    navigate("/chat");
  };
  return (
    <>
      <button
        className="absolute z-50 bg-red-300 px-4 py-2 rounded-md"
        onClick={() => setHomeSwitch((prev) => !prev)}
      >
        {homeSwitch ? "Switch to Profile" : "Switch to Home"}
      </button>
      <button
        className="absolute top-20 z-50 bg-red-300 px-4 py-2 rounded-md"
        onClick={handleChatClick}
      >
        CHAT
      </button>
      {/* <div
        className={`h-screen w-screen overflow-x-scroll flex flex-row items-center gap-0 bg-blue-100 transition-transform ease-in-out ${
          homeSwitch ? "translate-x-0" : "translate-x-[-50%]"
        }`}
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="z-[-1] w-screen">
              {profile.homeId ? (
                <div
                  onClick={handleHomeLessClick}
                  className={`h-screen w-full transition-all`}
                >
                  <HomeDashboard />
                </div>
              ) : (
                <div>
                  <HomeLess />
                </div>
              )}
            </div>
            <div
              onClick={handleProfileDashboardClick}
              className={`h-screen w-screen transition-all`}
            >
              <PersonalDashboard />
            </div>
          </>
        )}
      </div> */}
      <div
        className={`h-screen grid grid-rows-2 gap-0 transition-transform ease-in-out ${
          homeSwitch ? "translate-y-0" : "translate-y-[-100%]"
        }`}
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="">
            {profile.homeId ? (
              <div
                className={`transition-transform ease-in-out `}
                onClick={handleHomeLessClick}
              >
                <HomeDashboard />
              </div>
            ) : (
              <div>
                <HomeLess />
              </div>
            )}
            <div
              className={`transition-transform ease-in-out`}
              onClick={handleProfileDashboardClick}
            >
              <PersonalDashboard />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LandingPage;
