import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useHomeContext } from "../hooks/useHomeContext";

const HomePendingRequests = ({ pendingMembers }) => {
  const navigate = useNavigate();
  const homeId = useParams().id;
  const { user } = useAuthContext();
  const { dispatch } = useHomeContext();
  const [names, setNames] = useState({});

  useEffect(() => {
    fetchNames();
  }, [pendingMembers]); // Fetch names whenever pendingMembers change

  const fetchNames = async () => {
    const namesObject = {};
    await Promise.all(
      pendingMembers.map(async (member) => {
        try {
          const response = await fetch(`/profile/${member}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const json = await response.json();
          namesObject[member] = json.name;
        } catch (error) {
          console.error(error);
        }
      })
    );
    setNames(namesObject);
  };
  const handleNameClick = (userId) => {
    // Redirect to the user profile page when a name is clicked
    // history.push(`/profile/${userId}`);
    navigate(`requests/profile/${userId}`);
  };

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

      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "ACCEPT_USER_REQUEST", payload: data });
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
      
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "REJECT_USER_REQUEST", payload: data });
      } else {
        console.error("Failed to reject user request");
      }
    } catch (error) {
      console.error("Error rejecting user request:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-text text-4xl mb-4 text-center">Pending Requests</h2>
      <ul className="border-1 border-border rounded-lg p-4 mb-2">
        {pendingMembers &&
          pendingMembers.map((member, index) => (
            <li className="text-text text-2xl flex justify-between" key={index}>
              <h1 className="flex items-center gap-16" >
                {names[member] || member}
                <span onClick={() => handleNameClick(member)} className="cursor-pointer border-2 border-border rounded-md px-2 py-1 text-xs">View Profile</span>
              </h1>

              <div className="flex space-x-4">
                <button className="px-4 py-2 rounded-md hover:bg-secondary" onClick={() => handleAccept(member, homeId)}>Accept</button>
                <button className="px-4 py-2 rounded-md hover:bg-secondary" onClick={() => handleReject(member, homeId)}>Reject</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HomePendingRequests;
