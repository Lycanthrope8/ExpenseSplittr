import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export const RequestedMemberProfilePage = () => {
  const { userId } = useParams(); // Retrieve userId from URL parameters
  const { user } = useAuthContext(); 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include the authorization token in the headers
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const profileData = await response.json();
        setProfile(profileData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchProfilePicture = async () => {
        try {
          const response = await fetch(`/uploads/profilePictures/pp_${userId}`, {
            headers: {
              Authorization: `Bearer ${user.token}`, // Include the authorization token in the headers
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch profile picture");
          }
          const pictureBlob = await response.blob();
          const pictureUrl = URL.createObjectURL(pictureBlob);
          setProfilePictureUrl(pictureUrl);
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }
      };
      

    fetchProfile();
    fetchProfilePicture();
  }, [userId]);

  const handleAccept = async () => {
    // Implement accept logic here
    console.log("Accept clicked");
  };

  const handleReject = async () => {
    // Implement reject logic here
    console.log("Reject clicked");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>No profile found for this user.</div>;
  }
  
  return (
    <div className="grid text-text bg-secondary mx-auto rounded-lg p-4 lg:grid-cols-2 m-4 gap-4 lg:w-1/2 sm:w-3/4 sm:grid-cols-1">
      <div className="flex items-center col-span-1">
        {profilePictureUrl && <img src={profilePictureUrl} alt="Avatar" className="size-72 rounded-full" />}
      </div>
      <div className="col-span-1 text-lg">
        <div className="flex items-center justify-between mb-4">
          <label className="">Name:</label>
          <div className="">{profile.name}</div>
        </div>
        {/* <label className="flex text-2xl items-center">Email: {userId.email}</label> */}
        <div className="flex items-center justify-between mb-4">
          <label className="">Age:</label>
          <div className="">{profile.age}</div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <label className="">Gender:</label>
          <div className="">{profile.gender}</div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <label className="">Phone:</label>
          <div className="">{profile.phone}</div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <label className="">Address:</label>
          <div className="">{profile.address}</div>
        </div>
      <div className="flex justify-end mt-12 gap-4">
        <button className="px-2 py-1 rounded-md border-1 border-transparent bg-green-400 hover:border-green-400 hover:bg-transparent transition-colors" onClick={handleAccept}>Accept</button>
        <button className="px-2 py-1 rounded-md border-1 border-transparent bg-red-400 hover:border-red-400 hover:bg-transparent transition-colors" onClick={handleReject}>Reject</button>
      </div>
      </div>
    </div>
  );
};
