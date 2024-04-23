import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";
import PersonalDashboard from "../components/dashboards/PersonalDashboard";
import HomeDashboard from "../components/dashboards/HomeDashBoard";
import { HomeLess } from "../components/HomeLess";
import { useNavigate } from "react-router-dom";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const { user } = useAuthContext();
  const { profile } = useProfileContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [homeSwitch, setHomeSwitch] = useState(false);

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

  const box = useRef();

  useLayoutEffect(() => {
    // gsap.from(box.current, {
    //   opacity: 1,
    //   display: "block",
    //   duration: 2,
    //   delay: 0.3,
    // });
    // gsap.to(box.current, {
    //   opacity: "0",
    //   display: "none",
    //   duration: 2,
    // });
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from(box.current, {
        opacity: 1,
        display: "flex",
        duration: 1,
      });
      t1.to(box.current, {
        opacity: 0,
        display: "none",
        duration: 2,
        delay: 0.3,
      });
    }, box);
    return () => ctx.revert();
  }, []);

  window.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) {
      setHomeSwitch(true);
      // box.current.style.transform = `translateX(-${counter1 * 50}vw)`;
    } else if (e.deltaY < 0) {
      setHomeSwitch(false);
      // box.current.style.transform = `translateX(-${counter1 * 50}vw)`;
    }
    // console.log(counter1);
  });

  return (
    <>
      <div
        ref={box}
        className={`z-50 absolute flex gap-8 items-center justify-center top-0 left-0 h-screen w-screen bg-blue-gray-300/80 backdrop-blur-sm`}
      >
        <div className="flex flex-col text-text animate-mouse">
          <span className="material-symbols-outlined text-6xl">
            expand_less
          </span>
          <span className="material-symbols-outlined text-6xl">mouse</span>
          <span className="material-symbols-outlined text-6xl">
            expand_more
          </span>
        </div>
        <h1 className="text-text text-6xl flex items-center">
          Scroll to change dashboard
        </h1>
      </div>

      <button
        className="absolute top-10 z-40 bg-red-300 px-4 py-2 rounded-md"
        onClick={handleChatClick}
      >
        CHAT
      </button>
      {/* <div ref={box} className="flex items-center h-screen raceswrapper">
        <div className="races flex h-[50vh]">
          <h1 className="race1 w-screen bg-blue-100">RACE1</h1>
          <h1 className="race2 w-screen bg-blue-200">RACE2</h1>
          <h1 className="race3 w-screen bg-blue-300">RACE3</h1>
          <h1 className="race4 w-screen bg-blue-400">RACE4</h1>
          <h1 className="race5 w-screen bg-blue-500">RACE5</h1>
        </div>
      </div> */}
      <div className="dashwrapper ml-[-60px] max-h-screen w-[200vw] box-border">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div
            className={`dashes w-full h-full grid grid-cols-2  transition-transform ease-in-out duration-300 ${
              homeSwitch ? "translate-x-[-100vw]" : "translate-x-[0]"
            }`}
            // ${homeSwitch ? "translate-y-0" : "translate-y-[-50%]"}
          >
            {profile.homeId ? (
              <div
                className={`dash-1 transition-transform ease-in-out`}
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
              className={`dash-2 transition-transform ease-in-out`}
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
