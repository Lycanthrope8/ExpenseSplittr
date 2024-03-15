import { createContext, useReducer } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
export const profileFormContext = createContext();


export const profileFormReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROFILE': 
          return {
            ...state,
            profile: action.payload // Assuming payload is an object
          }
        case 'UPDATE_PROFILE':
          return {
            ...state,
            profile: action.payload // Assuming payload is an object
          }
        default:
          return state
      }
};

export const ProfileFormProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [state, dispatch] = useReducer(profileFormReducer, {
        profile: { ...user } // Create a duplicate of the user object
    });
    return (
        <profileFormContext.Provider value={{ ...state, dispatch }}>
            {children}
        </profileFormContext.Provider>
    );
};
