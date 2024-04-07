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
    <div className="grid lg:grid-cols-2 m-4 gap-8 lg:w-1/2 sm:w-3/4 sm:grid-cols-1">
      <div className="flex items-center justify-between col-span-1">
        {profilePictureUrl && <img src={profilePictureUrl} alt="Avatar" className="w-24 h-24 rounded-full" />}
      </div>
      <label className="flex text-white text-2xl ml-0 items-center justify-between">Name: {profile.name}</label>
      <label className="flex text-white text-2xl ml-0 items-center justify-between">Email: {profile.email}</label>
      <div className="flex items-center justify-between col-span-1">
        <label className="text-white text-2xl mr-4">Age:</label>
        <span className="text-white">{profile.age}</span>
      </div>
      <div className="flex items-center justify-between col-span-1">
        <label className="text-white text-2xl mr-4">Gender:</label>
        <span className="text-white">{profile.gender}</span>
      </div>
      <div className="flex items-center justify-between col-span-1">
        <label className="text-white text-2xl mr-4">Phone:</label>
        <span className="text-white">{profile.phone}</span>
      </div>
      <div className="flex items-center justify-between col-span-1">
        <label className="text-white text-2xl mr-4">Address:</label>
        <span className="text-white">{profile.address}</span>
      </div>
      <div className="flex justify-between col-span-2 mt-4">
        <button className="px-4 py-2 rounded-md bg-green-500 text-white" onClick={handleAccept}>Accept</button>
        <button className="px-4 py-2 rounded-md bg-red-500 text-white" onClick={handleReject}>Reject</button>
      </div>
    </div>
  );
};
