// import React from 'react';
// import { useAuthContext } from '../hooks/useAuthContext';
// import { format } from 'date-fns';

// const ExploreAllHomes = ({ homelist }) => {
//   const { user } = useAuthContext();

//   const handleClick = async () => {
//     if (!user) {
//       return;
//     }
//   };

//   return (
//     <div>
//       {homelist.map((home, index) => (
        
//         <div
//           key={index}
//           className="expense-details flex justify-between text-white bg-secondary-dark-bg p-4 mb-4 rounded-2xl"
//         >
//           <div className="flex flex-col">
//             <h4 className="text-3xl border-b-1 mb-2">{home.homeId}</h4>
            
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ExploreAllHomes;

import React from 'react'

export const ExploreAllHomes = () => {
  return (
    <div>all home list</div>
  )
}
