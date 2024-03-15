import ProfileForm from "../components/ProfileForm";
import { ProfileFormProvider } from "../context/ProfileFormContext";

const Profile = () => {
  return (
    <div>
      <h1>This is Profile Page</h1>
      <ProfileFormProvider>
        <ProfileForm />
      </ProfileFormProvider>
    </div>
  );
};

export default Profile;
