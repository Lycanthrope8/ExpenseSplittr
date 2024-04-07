// import React, { useEffect, useState } from "react";
// import { useProfileContext } from "../hooks/useProfileContext";
import { useAuthContext } from "../hooks/useAuthContext";

const CreditDetails = ({credit, updateHandler}) => {


    const { user } = useAuthContext();
    

    

    const handleConfirmSettlement = (id) => {
        return async () => {
        //   console.log("id: ", id);
        const response = await fetch(
            `/api/debtorCreditor/settled/${id}`,
            {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ settled: true }),
            }
        );
        if (response.ok) {
            await updateHandler(); // Call updateHandler after successful action
          }
        };
    };

    const handleDeclineSettlement = (id) => {
        return async () => {
        //   console.log(" id: ", id);
        const response = await fetch(
            `/api/debtorCreditor/underSettlement/${id}`,
            {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ UnderSettlement: false }),
            }
        );
        if (response.ok) {
            await updateHandler(); // Call updateHandler after successful action
          }
        };
    };
    
    return (
        <>
            <td className='align-middle py-4'>{credit.debtor.name}</td>
            <td className='text-left align-middle py-4'>{credit.title || "N/A"}</td>
            <td className='text-left align-middle py-4'>{credit.tag || "N/A"}</td>
            <td className='text-left align-middle py-4'>{credit.amount || "N/A"}</td>
            <td className='flex items-center justify-center py-4'>{credit.UnderSettlement ? (
                <div className="space-x-2">
                  <button className="px-4 py-1 rounded-md border-1 border-light-green-300/50 hover:bg-light-green-300 hover:text-gray-800 transition-colors" onClick={handleConfirmSettlement(credit._id)}>Confirm Settlement</button>
                  <button className="px-4 py-1 rounded-md border-1 border-red-300/50 hover:bg-red-300 hover:text-gray-800 transition-colors" onClick={handleDeclineSettlement(credit._id)}>Decline Settlement</button>
                </div>
              ) : (
                <div>
                  <h1 className="px-4 py-1 rounded-md border-1 border-amber-300/50">Waiting for Settlement</h1>
                </div>
              )}</td>
        </>
    );
}

export default CreditDetails