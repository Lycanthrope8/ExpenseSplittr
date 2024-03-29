import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// import ProfilePicture from "./ProfilePicture";
import { ProfileContext } from "../context/ProfileContext";
import { Avatar } from "@mui/material";

const ProfileBadge = ({ user }) => {
  const { profile } = useContext(ProfileContext);
  const [loading, setLoading] = useState(true);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  useEffect(() => {
    if (profile) {
      setLoading(false);
      setProfilePictureUrl(
        profile.avatar ||
          "http://localhost:4000/uploads/profilePictures/default.jpg"
      );
    }
  }, [profile]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Link
      to={`/profile/${user.userId}`}
      className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden ring-2 ring-zinc-500 bg-secondary-dark-bg rounded-full"
    >
      <Avatar
        alt={user.email.charAt(0).toUpperCase()}
        src={profilePictureUrl}
        sx={{ height: 44, width: 44 }}
      ></Avatar>
    </Link>
  );
};

export default ProfileBadge;
