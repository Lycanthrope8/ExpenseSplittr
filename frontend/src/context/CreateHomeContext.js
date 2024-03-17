// // .js

// import React, { createContext, useReducer, useEffect } from 'react';

// export const CreateHomeContext = createContext();

// export const CreateHomeReducer = (state, action) => {
//   switch (action.type) {
//     case 'CreateHome':
//       return { CreateHome: action.payload };
//     default:
//       return state;
//   }
// };

// export const CreateHomeContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(CreateHomeReducer, {
//     CreateHome: null
//   });

//   useEffect(() => {
//     const fetchCreateHome = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem('user'));
//         const response = await fetch(`/home/${user.userId}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${user.token}`
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch Home');
//         }

//         const CreateHomeData = await response.json();
//         dispatch({ type: 'CreateHome', payload: CreateHomeData });
//       } catch (error) {
//         console.error('Error fetching Home:', error);
//       }
//     };

//     fetchCreateHome();
//   }, []);

//   return (
//     <CreateHomeContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </CreateHomeContext.Provider>
//   );
// };


import { createContext, useReducer } from 'react'

export const CreateHomeContext = createContext()

export const CreateHomeReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_HOME': 
      return {
        CreateHome: action.payload
      }
    

    default:
      return state
  }
}

export const CreateHomeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CreateHomeReducer, {
    CreateHome: null
  })

  return (
    <CreateHomeContext.Provider value={{...state, dispatch}}>
      { children }
    </CreateHomeContext.Provider>
  )
}