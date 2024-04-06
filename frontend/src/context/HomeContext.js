import React, { createContext, useReducer, useEffect } from "react";


export const HomeContext = createContext();

export const homeReducer = (state, action) => {
  switch (action.type) {
    case "SET_HOME":
      return { home: action.payload };
    case "UPDATE_HOME":
      console.log(action.payload);
      return { ...state, home: action.payload };
    case "ACCEPT_USER_REQUEST":
      return { ...state, home: action.payload };
    case "REJECT_USER_REQUEST":
      return { ...state, home: action.payload };
    default:
      return state;
  }
};

export const HomeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(homeReducer, {
    home: null,
  });

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const preResponse = await fetch(`/profile/${user.userId}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
        const preData = await preResponse.json();
        const homeId = preData.homeId;
        const response = await fetch(`/home/${homeId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
       
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const homeData = await response.json();
        dispatch({ type: "SET_HOME", payload: homeData });
      } catch (error) {
        console.error("Error fetching home: ", error);
      }
    };
    fetchHome();
  }, []); 

  return (
    <HomeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HomeContext.Provider>
  );
};
