import React, { useState } from "react";
import PersonalDashboard from "../components/dashboards/PersonalDashboard";
import HomeDashBoard from "../components/dashboards/HomeDashBoard";
import { HomeLess } from "../components/HomeLess";
import { Personal } from "../components/Personal";
import { Home } from "../components/Home";

const LandingPage = () => {
  const [showPersonal, setShowPersonal] = useState(false);
  const [showHome, setShowHome] = useState(false);

  const handleProfileDashboardClick = () => {
    setShowHome(false);
    setShowPersonal(true);
  };

  const handleHomeLessClick = () => {
    setShowHome(true);
    setShowPersonal(false);
  };

  return (
    <div className="grid grid-rows-2 gap-8">
      {!showHome && !showPersonal && (
        <div onClick={handleProfileDashboardClick}>
          <PersonalDashboard />
        </div>
      )}
      {!showPersonal && !showHome && (
        <div onClick={handleHomeLessClick}>
          <HomeLess />
        </div>
      )}
      {showPersonal && <Personal />}
      {showHome && <Home />}
    </div>
  );
};

export default LandingPage;
