import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Toaster, toast } from 'sonner';
import CircularProgress from '@mui/material/CircularProgress';

export const HomeDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [home, setHome] = useState([]);
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
    const json = await response.json();

    setRequestSending(false); 
    if (!response.ok) {
      toast.error('You already requested to join this home!', {
        classNames: {
          toast: 'bg-red-300',
        },
      });
      // setError(json.error);
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
    <div className='flex h-screen items-center'>
      <p className='flex w-40 mx-auto font-2xl bg-slate-200 p-4 rounded-lg '>
      <CircularProgress className="mr-4" />
      Loading...</p>
    </div>
  ) : (
    <div className="expense-details flex justify-between text-white bg-secondary-dark-bg p-4 mb-4 rounded-2xl">
      <div className="flex flex-col">
        <h4 className="text-3xl border-b-1 mb-2">{home.name}</h4>
        <p className="text-lg mb-4">
          <strong>Location: </strong>
          {home.location}
        </p>
        <p className="text-lg mb-4">
          <strong>Accommodation Type: </strong>
          {home.accommodationType}
        </p>
        <p className="text-lg mb-4">
          <strong>Bedrooms: </strong>
          {home.bedrooms}, <strong>Bathrooms: </strong>
          {home.bathrooms}
        </p>
        <p className="text-lg mb-4">
          <strong>Rent Amount: </strong>${home.rentAmount}
        </p>
        <p className="text-lg mb-4">
          <strong>Utilities Included: </strong>
          {home.utilitiesIncluded ? "Yes" : "No"}
        </p>
        <p className="text-lg mb-4">
          <strong>Move In Date: </strong>
          {new Date(home.moveInDate).toLocaleDateString()}
        </p>
        {home.images && home.images.length > 0 && (
          <div>
            {home.images.map((image, index) => (
              <img
                key={index}
                src={`/${image}`}
                alt={`Home ${home.name}`}
                style={{
                  maxWidth: "100px",
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
          className="rounded-xl text-center p-2 hover:text-main-dark-bg hover:bg-zinc-200"
          onClick={handleJoinReq}
          disabled={requestSending || requestSent} // Disable button when request is sending or already sent
        >
          {requestSending ? "Sending Request..." : requestSent ? "Cancel Request" : "Request to Join"}
        </button>
        {error && <div className="error">{error}</div>}
        <div className="col-span-1">
          <Toaster />
        </div>
      </div>
    </div>
  );
};
