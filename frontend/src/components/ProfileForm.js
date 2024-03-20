import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { useAuthContext } from "../hooks/useAuthContext";
import CircularProgress from '@mui/material/CircularProgress';

const ProfileForm = ({ onPictureChange }) => {
  // Add onPictureChange as a prop
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const { profile, dispatch } = useContext(ProfileContext);

  useEffect(() => {
    if (profile) {
      setLoading(false);
      setName(profile.name || "");
      setAge(profile.age || "");
      setGender(profile.gender || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
    }
  }, [profile]);

  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to update your profile");
      return;
    }

    const formData = new FormData(); 

    formData.append("name", name);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("avatar", avatar); 

    try {
      const response = await fetch(`/profile/${user.userId}`, {
        method: "PATCH",
        body: formData, 
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      } else {
        setEmptyFields([]);
        setError(null);
        dispatch({ type: "SET_PROFILE", payload: json });

        // Update profile picture URL if a new picture is uploaded
        if (json.avatar) {
          onPictureChange(json.avatar);
        }
      }
    } catch (error) {
      setError("Error updating profile");
    }
  };

  if (loading) {
    return <div className='flex h-screen items-center'>
    <p className='flex w-40 mx-auto font-2xl bg-slate-200 p-4 rounded-lg '>
    <CircularProgress className="mr-4" />
    Loading...</p>
  </div>;
  }

  return (
    <form className="grid grid-cols-2 m-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-zinc-100 text-xl ml-0">Avatar:</label>
        <input
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
          accept="profilePictures/*"
          className="block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-zinc-100 text-xl ml-0">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={emptyFields.includes("name") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
        />
      </div>
      <label className="block text-zinc-100 text-xl ml-0">Email: {user.email}</label>
      <div>
        <label className="block text-zinc-100 text-xl ml-0">Age:</label>
        <input
          type="number"
          value={age || ""}
          onChange={(e) => setAge(parseInt(e.target.value))}
          className={emptyFields.includes("age") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
        />
      </div>
      <div>
        <label className="block text-zinc-100 text-xl ml-0">
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={emptyFields.includes("gender") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
      </div>
      <div>
        <label className="block text-zinc-100 text-xl ml-0">Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={emptyFields.includes("phone") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
        />
      </div>
      <div>
        <label className="block text-zinc-100 text-xl ml-0">Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={emptyFields.includes("address") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
        />
      </div>
      <button className="col-span-2 mt-2 p-2 bg-accent text-zinc-800 rounded-2xl w-full hover:opacity-90" type="submit">Update Profile</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProfileForm;
