import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileBadge from "./ProfileBadge";
import { useAuthContext } from "../hooks/useAuthContext";
import { ProfileContext } from "../context/ProfileContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBangladeshiTakaSign } from "@fortawesome/free-solid-svg-icons";
import { create } from "@mui/material/styles/createTransitions";
import { useLogout } from "../hooks/useLogout";

const Sidebar = ({ active }) => {
  const { user } = useAuthContext();
  const { profile } = useContext(ProfileContext);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [more, setMore] = useState(false);
  const SidebarContext = createContext();

  const handleHomeClick = () => {
    navigate("/");
  };
  const handleChatClick = () => {
    navigate("/chat");
  };

  const handleClick = () => {
    logout();
  };
  return (
    <div
      className="inline-flex h-screen py-2 z-50 sticky top-0 left-0"
      onMouseEnter={() => setExpanded((curr) => !curr)}
      onMouseLeave={() => {
        setExpanded((curr) => !curr);
        setMore((prev) => false);
      }}
    >
      <div
        className={`h-full flex flex-col bg-blue-gray-900 rounded-lg shadow-sm`}
      >
        {/* <SidebarContext.Provider value={{expanded}}> */}
        {/* {expanded ? <span className='material-symbols-rounded'>chevron_right</span> : <span className='material-symbols-rounded'>chevron_left</span>} */}
        <ul className="flex-1 p-3 space-y-4">
          <li
            onClick={handleHomeClick}
            className={`flex items-center justify-center text-text px-4 py-4 bg-blue-gray-300 border-border my-1 font-medium rounded-full cursor-pointer transition-all
                        `}
          >
            <span
              className={`mb-[-8px] transition-all ${expanded ? "text-2xl" : "text-4xl"
                }`}
            >
              E
            </span>
            <h1
              className={`flex items-center text-2xl overflow-hidden mb-[-8px] transition-all ${expanded ? "w-[85px]" : "w-0"
                }`}
            >
              xpense
            </h1>
            <span
              className={`mb-[-8px] transition-all ${expanded ? "text-2xl" : "text-4xl"
                }`}
            >
              S
            </span>
            <h1
              className={`flex items-center text-2xl overflow-hidden mb-[-8px] transition-all ${expanded ? "w-[60px]" : "w-0"
                }`}
            >
              plittr
            </h1>
          </li>
          <li
            onClick={handleHomeClick}
            className={`flex items-center justify-evenly text-text px-4 py-4 my-1 font-medium rounded-md cursor-pointer transition-color
                        ${active
                ? "bg-blue-gray-800 text-white"
                : "hover:bg-blue-gray-800 hover:text-white"
              }
                        `}
          >
            <span className="material-symbols-rounded text-4xl">home</span>
            <h1
              className={`flex items-center text-lg overflow-hidden mb-[-8px] transition-all ${expanded ? "w-32 ml-3" : "w-0"
                }`}
            >
              Home
            </h1>
          </li>
          <li
            className={`flex items-center justify-evenly text-text px-4 py-4 my-1 font-medium rounded-md cursor-pointer transition-color
                        ${active
                ? "bg-blue-gray-800 text-white"
                : "hover:bg-blue-gray-800 hover:text-white"
              }
                        `}
          >
            <span className="material-symbols-rounded text-4xl">add_task</span>
            <h1
              className={`flex items-center text-lg overflow-hidden mb-[-8px] transition-all ${expanded ? "w-32 ml-3" : "w-0"
                }`}
            >
              Task
            </h1>
          </li>
          <li
            className={`flex items-center justify-evenly text-text px-4 py-4 my-1 font-medium rounded-md cursor-pointer transition-color
                        ${active
                ? "bg-blue-gray-800 text-white"
                : "hover:bg-blue-gray-800 hover:text-white"
              }
                        `}
          >
            <FontAwesomeIcon icon={faBangladeshiTakaSign} size="2xl" />
            <h1
              className={`flex items-center text-lg overflow-hidden mb-[-8px] transition-all ${expanded ? "w-32 ml-3" : "w-0"
                }`}
            >
              Expenses
            </h1>
          </li>
          <li
            onClick={handleChatClick}
            className={`flex items-center justify-evenly text-text px-4 py-4 my-1 font-medium rounded-md cursor-pointer transition-color
                        ${active
                ? "bg-blue-gray-800 text-white"
                : "hover:bg-blue-gray-800 hover:text-white"
              }
                        `}
          >
            <span className="material-symbols-rounded text-4xl">chat</span>
            <h1
              className={`flex items-center text-lg overflow-hidden transition-all ${expanded ? "w-32 ml-3" : "w-0"
                }`}
            >
              Chat
            </h1>
          </li>
        </ul>
        <div className="p-3">
          {user && (
            <div className="flex items-center justify-start text-text p-4 font-medium rounded-md cursor-pointer transition-color">
              <ProfileBadge user={user} />
              <div
                className={`flex items-center justify-between overflow-hidden transition-all static ${expanded ? "w-32 ml-3" : "w-0"
                  }`}
              >
                <span
                  className={`text-md overflow-hidden transition-all mb-[-4px]`}
                >
                  {user && profile ? profile.name : null}
                </span>

                <span
                  className={`material-symbols-rounded p-1 rounded-md hover:bg-secondary/80`}
                  onClick={() => setMore((curr) => !curr)}
                >
                  more_vert
                </span>
                {expanded && (
                  <div
                    className={`absolute ml-1 left-0 bg-secondary w-max rounded-md transition-all ${more
                      ? "bottom-24 z-0 opacity-1"
                      : "bottom-4 z-[-1] opacity-0"
                      }`}
                  >
                    <li
                      className={`flex text-xl items-center px-20 py-2 overflow-hidden rounded-tl-md rounded-tr-md hover:bg-tertiary-dark-bg transition-all`}
                      onClick={() => navigate("/admin")}
                    >
                      Admin
                    </li>
                    <li
                      className={`flex text-xl items-center px-20 py-2 overflow-hidden rounded-bl-md rounded-br-md hover:bg-tertiary-dark-bg transition-all`}
                      onClick={handleClick}
                    >
                      Logout
                    </li>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {/* </SidebarContext.Provider> */}
      </div>
    </div>
  );
};

export default Sidebar;
