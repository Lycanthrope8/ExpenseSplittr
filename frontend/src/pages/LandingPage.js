import React from "react";
import PersonalDashboard from "../components/dashboards/PersonalDashboard";
import { HomeLess } from "../components/HomeLess";

const LandingPage = () => {
  return (
    <div className="grid grid-rows-2 gap-8">
      <PersonalDashboard />
      <HomeLess />
    </div>
  );
};

export default LandingPage;
