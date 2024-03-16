import ProfileForm from "../components/ProfileForm";
import { useState } from "react";
import ProfilePicture from "../components/ProfilePicture";
import { ProfileContextProvider } from "../context/ProfileContext";

const Profile = () => {
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    "http://localhost:4000/uploads/profilePictures/default.jpg"
  );

  const handlePictureChange = (newPictureUrl) => {
    setProfilePictureUrl(newPictureUrl);
  };

  return (
    <div>
      <h1>This is Profile Page</h1>
      <ProfileContextProvider>
        <ProfilePicture imageUrl={profilePictureUrl} />
        <ProfileForm onPictureChange={handlePictureChange} />
      </ProfileContextProvider>
    </div>
  );
};

export default Profile;
