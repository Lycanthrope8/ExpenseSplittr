import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBangladeshiTakaSign } from '@fortawesome/free-solid-svg-icons'
import { create } from '@mui/material/styles/createTransitions';

const Sidebar = ({active}) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const SidebarContext = createContext();
    const handleHomeClick = () => {
        navigate('/');
    }
    return (
        <div className='inline-flex h-screen py-2'>
            <div className={`h-full flex flex-col bg-blue-gray-900 rounded-lg shadow-sm`}>
                {/* <SidebarContext.Provider value={{expanded}}> */}
                {/* {expanded ? <span className='material-symbols-rounded'>chevron_right</span> : <span className='material-symbols-rounded'>chevron_left</span>} */}
                <ul className="flex-1 p-3 space-y-4" onMouseEnter={() => setExpanded(curr => !curr)} onMouseLeave={() => setExpanded(curr => !curr)}>
                    <li onClick={handleHomeClick} className={`flex items-center justify-evenly text-text px-4 py-4 my-1 font-medium rounded-md cursor-pointer transition-color
                        ${
                            active ? 'bg-blue-gray-800 text-white' : 'hover:bg-blue-gray-800 hover:text-white'
                        }
                        `}
          >
            <span className="material-symbols-rounded text-4xl">home</span>
            <h1
              className={`flex items-center text-lg overflow-hidden mb-[-8px] transition-all ${
                expanded ? "w-32 ml-3" : "w-0"
              }`}
            >
              Home
            </h1>
          </li>
          <li
            className={`flex items-center justify-evenly text-text px-4 py-4 my-1 font-medium rounded-md cursor-pointer transition-color
                        ${
                          active
                            ? "bg-blue-gray-800 text-white"
                            : "hover:bg-blue-gray-800 hover:text-white"
                        }
                        `}
          >
            <span className="material-symbols-rounded text-4xl">add_task</span>
            <h1
              className={`flex items-center text-lg overflow-hidden mb-[-8px] transition-all ${
                expanded ? "w-32 ml-3" : "w-0"
              }`}
            >
              Task
            </h1>
          </li>
          <li
            className={`flex items-center justify-evenly text-text px-4 py-4 my-1 font-medium rounded-md cursor-pointer transition-color
                        ${
                          active
                            ? "bg-blue-gray-800 text-white"
                            : "hover:bg-blue-gray-800 hover:text-white"
                        }
                        `}
          >
            <FontAwesomeIcon icon={faBangladeshiTakaSign} size="2xl" />
            <h1
              className={`flex items-center text-lg overflow-hidden mb-[-8px] transition-all ${
                expanded ? "w-32 ml-3" : "w-0"
              }`}
            >
              Expenses
            </h1>
          </li>
        </ul>
        <div className="p-3">
          {user && (
            <div className="flex items-center justify-start text-text p-4 font-medium rounded-md cursor-pointer transition-color">
              <ProfileBadge user={user} />
              <div
                className={`flex items-center justify-between overflow-hidden transition-all static ${
                  expanded ? "w-32 ml-3" : "w-0"
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
                    className={`absolute ml-1 left-0 bg-secondary w-max rounded-md transition-all ${
                      more
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
                    <li className={`flex items-center justify-evenly text-text px-4 py-4 my-1 font-medium rounded-md cursor-pointer transition-color
                        ${
                            active ? 'bg-blue-gray-800 text-white' : 'hover:bg-blue-gray-800 hover:text-white'
                        }
                        `}>
                        <span className='material-symbols-rounded text-4xl'>add_task</span>
                        <h1 className={`flex items-center text-lg overflow-hidden mb-[-8px] transition-all ${expanded ? "w-32 ml-3" : "w-0"}`}>Task</h1>
                    </li>
                    <li className={`flex items-center justify-evenly text-text px-4 py-4 my-1 font-medium rounded-md cursor-pointer transition-color
                        ${
                            active ? 'bg-blue-gray-800 text-white' : 'hover:bg-blue-gray-800 hover:text-white'
                        }
                        `}>
                        <FontAwesomeIcon icon={faBangladeshiTakaSign} size='2xl'/>
                        <h1 className={`flex items-center text-lg overflow-hidden mb-[-8px] transition-all ${expanded ? "w-32 ml-3" : "w-0"}`}>Expenses</h1>
                    </li>
                </ul>
                {/* </SidebarContext.Provider> */}
            </div>
            
        </div>
    )
    }

export default Sidebar