import ProfileForm from "../components/ProfileForm";
import { ProfileContextProvider } from "../context/ProfileContext";

const Profile = () => {
  return (
    <div>
      <h1>This is Profile Page</h1>
      <ProfileContextProvider>
        <ProfileForm />
      </ProfileContextProvider>
    </div>
  );
};

export default Profile;
