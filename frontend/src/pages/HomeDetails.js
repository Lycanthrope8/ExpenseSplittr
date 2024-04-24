import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";
import { Toaster, toast } from "sonner";
import CircularProgress from "@mui/material/CircularProgress";

export const HomeDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [home, setHome] = useState([]);
  const { profile } = useProfileContext();
  const { user } = useAuthContext();
  const [error, setError] = useState();
  const [requestSending, setRequestSending] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleJoinReq = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to add an expense");
      return;
    }

    // Check if profile is incomplete
    const isProfileIncomplete =
      !profile.address ||
      !profile.age ||
      !profile.gender ||
      !profile.name ||
      !profile.phone ||
      !profile.userId;

    if (isProfileIncomplete) {
      setError("Complete your profile to be able to send a join request");
      return;
    }

    setRequestSending(true);
    const userId = user.userId;
    const payload = { userId, id };
    const response = await fetch("/home/joinReqHome", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    // const json = await response.json();

    setRequestSending(false);
    if (!response.ok) {
      toast.error("You already requested to join this home!", {
        classNames: {
          toast: "bg-red-300",
        },
      });
    } else {
      setRequestSent(true);
    }
  };

  useEffect(() => {
    const fetchhome = async () => {
      try {
        // console.log(id);
        const response = await fetch(`/home/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();

        if (response.ok) {
          setHome(json);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    if (user) {
      fetchhome();
    }
  }, [user, id]);

  return loading ? (
    <div className="flex h-screen items-center">
      <p className="flex w-40 mx-auto font-2xl bg-slate-200 p-4 rounded-lg ">
        <CircularProgress className="mr-4" />
        Loading...
      </p>
    </div>
  ) : (
    <div className="expense-details flex justify-between text-white bg-secondary-dark-bg p-4 mb-4 rounded-2xl">
      <div className="flex flex-col">
        <h4 className="text-3xl border-b-1 mb-2">{home.name}</h4>
        <p className="text-xl mb-4">
          <strong>Location: </strong>
          {home.location}
        </p>
        <p className="text-xl mb-4">
          <strong>Accommodation Type: </strong>
          {home.accommodationType}
        </p>
        <p className="text-xl mb-4">
          <strong>Bedrooms: </strong>
          {home.bedrooms}, <strong>Bathrooms: </strong>
          {home.bathrooms}
        </p>
        <p className="text-xl mb-4">
          <strong>Rent Amount: </strong>${home.rentAmount}
        </p>
        <p className="text-xl mb-4">
          <strong>Utilities Included: </strong>
          {home.utilitiesIncluded ? "Yes" : "No"}
        </p>
        <p className="text-xl mb-4">
          <strong>Move In Date: </strong>
          {new Date(home.moveInDate).toLocaleDateString()}
        </p>
        {home.images && home.images.length > 0 && (
          <div className="flex gap-4">
            {home.images.map((image, index) => (
              <img
                key={index}
                src={`/${image}`}
                alt={`Home ${home.name}`}
                style={{
                  maxWidth: "250px",
                  marginRight: "10px",
                  border: "none",
                  margin: "0",
                  padding: "0",
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2">
        <button
          className="rounded-lg border-1 border-border text-center px-8 py-2 hover:bg-gray-900/40"
          onClick={handleJoinReq}
          disabled={requestSending || requestSent} // Disable button when request is sending or already sent
        >
          {requestSending
            ? "Sending Request..."
            : requestSent
              ? "Cancel Request"
              : home.pendingMembers && home.pendingMembers.includes(user.userId)
                ? "Cancel Request"
                : "Request to Join"}
        </button>
        {error && <div className="error">{error}</div>}
        <div className="col-span-1">
          <Toaster />
        </div>
      </div>
    </div>
  );
};
