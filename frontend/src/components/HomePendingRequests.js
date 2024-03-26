import React from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const HomePendingRequests = ({ pendingMembers }) => {
  const homeId = useParams().id;
  const { user } = useAuthContext();
  const handleAccept = async (userId, homeId) => {
    try {
      // Send a PATCH request to accept the user request
      const info = { userId, homeId };
      // console.log(info);
      const response = await fetch(`/home/accept`, {
        method: "PATCH",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        console.log(`User request accepted successfully for user ${userId}`);
      } else {
        console.error("Failed to accept user request");
      }
    } catch (error) {
      console.error("Error accepting user request:", error);
    }
  };

  const handleReject = async (userId, homeId) => {
    try {
      const info = { userId, homeId };
      const response = await fetch(`/home/reject`, {
        method: "PATCH",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        console.log(`User request rejected successfully for user ${userId}`);
      } else {
        console.error("Failed to reject user request");
      }
    } catch (error) {
      console.error("Error rejecting user request:", error);
    }
  };

  return (
    <div>
      <h2>Pending Requests</h2>
      <ul>
        {pendingMembers.map((member, index) => (
          <li key={index}>
            {member} {/* Assuming member has a userId property */}
            <button onClick={() => handleAccept(member, homeId)}>Accept</button>
            <button onClick={() => handleReject(member, homeId)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePendingRequests;
