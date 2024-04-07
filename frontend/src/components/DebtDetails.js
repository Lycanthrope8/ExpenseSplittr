// import React, { useEffect, useState } from "react";
// import { useProfileContext } from "../hooks/useProfileContext";
import { useAuthContext } from "../hooks/useAuthContext";

const DebtDetails = ({debt, updateHandler}) => {


    const { user } = useAuthContext();

    const handleSettle = (id) => {
        return async () => {
        //   console.log("id: ", id);
        const response = await fetch(
            `/api/debtorCreditor/underSettlement/${id}`,
            {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ UnderSettlement: true }),
            }
        );
        if (response.ok) {
            await updateHandler(); // Call updateHandler after successful action
          }
        };
    };

    
    
    
    return (
        <>
        <td className='align-middle py-4'>{debt.creditor.name}</td>
        <td className='text-left align-middle py-4'>{debt.title || "N/A"}</td>
        <td className='text-left align-middle py-4'>{debt.tag || "N/A"}</td>
        <td className='text-left align-middle py-4'>{debt.amount || "N/A"}</td>
        <td className='text-center mx-auto py-4'>{!debt.UnderSettlement ? (
                <button className="px-4 py-1 rounded-md bg-secondary" onClick={handleSettle(debt._id)}>Settle</button>
              ) : (
                <h1 className="px-4 py-1 rounded-md border-1 border-amber-300/50">Waiting for Confirmation</h1>
              )}</td>
        </>
    )
}

export default DebtDetails