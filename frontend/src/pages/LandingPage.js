import React, { useState } from "react";
import PersonalDashboard from "../components/dashboards/PersonalDashboard";
import HomeDashBoard from "../components/dashboards/HomeDashBoard";
import { HomeLess } from "../components/HomeLess";
import { Personal } from "../components/Personal";
import { Home } from "../components/Home"

const LandingPage = () => {
  const [showPersonal, setShowPersonal] = useState(false);
  const [showHome, setShowHome] = useState(false);

  const handleProfileDashboardClick = () => {
    setShowHome(false)
    setShowPersonal(true);
  };
  const handleHomeDashboardClick = () => {
    setShowPersonal(false)
    setShowHome(true);
  };

  return (
    <div>
      {!showPersonal && <div onClick={handleProfileDashboardClick}><PersonalDashboard/></div>}
      {showPersonal && <Personal />}
      {!showHome && <div onClick={handleHomeDashboardClick}><HomeLess /></div>}
      {showHome && <Home />}
    </div>
  );
};

export default LandingPage;
