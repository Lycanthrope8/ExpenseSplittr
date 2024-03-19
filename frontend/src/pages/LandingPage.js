import React from "react";
import PersonalDashboard from "../components/dashboards/PersonalDashboard";
import { Home } from "../components/Home";

const LandingPage = () => {
  return (
    <div>
      <PersonalDashboard />
      <Home />
      
    </div>
  );
};

export default LandingPage;
