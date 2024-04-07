// import React, { useEffect, useState } from "react";
// import { useProfileContext } from "../hooks/useProfileContext";
import { useAuthContext } from "../hooks/useAuthContext";

const DebtDetails = ({debtor, credits}) => {


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
        };
    };
    
    return (
        <>
        <td className='align-middle py-4'>{debtor.name}</td>
        <td className='text-left align-middle py-4'>{credits.find(
                        (credit) => credit.debtor.userId === debtor.userId
            )?.title || "N/A"}</td>
        <td className='text-left align-middle py-4'>{credits.find(
                        (credit) => credit.debtor.userId === debtor.userId
            )?.tag || "N/A"}</td>
        <td className='text-left align-middle py-4'>{credits.find(
                        (credit) => credit.debtor.userId === debtor.userId
            )?.amount || "N/A"}</td>
        <td className='py-2'>{credits.find((credit) => credit.debtor.userId === debtor.userId)?.UnderSettlement ? (
            <div>
                <button
                    onClick={handleConfirmSettlement(
                        credits.find(
                            (credit) => credit.debtor.userId === debtor.userId
                        )?._id
                    )}
                >
                    Confirm Settlement
                </button>
                <button
                    onClick={handleDeclineSettlement(
                        credits.find(
                            (credit) => credit.debtor.userId === debtor.userId
                        )?._id
                    )}
                >
                    Decline Settlement
                </button>
            </div>
            ) : (
                <div>
                    <button>Waiting for Settlement</button>
                </div>
        )}</td>
        </>
    )
}

export default DebtDetails