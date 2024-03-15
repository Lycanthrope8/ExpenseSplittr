// ProfileFormContext.js
import { createContext, useReducer } from 'react';

export const profileFormContext = createContext();

export const profileFormReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};

export const ProfileFormProvider = ({ children }) => {
    const [state, dispatch] = useReducer(profileFormReducer, {
        user: null
    });
    return (
        <profileFormContext.Provider value={{ ...state, dispatch }}>
            {children}
        </profileFormContext.Provider>
    );
};
