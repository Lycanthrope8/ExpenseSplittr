import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";
// import { HomeContext } from "../context/HomeContext";
import { useAuthContext } from "../hooks/useAuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Toaster, toast } from 'sonner';
// import LinearProgress from "@mui/material/LinearProgress";
// import Box from "@mui/material/Box";

const ProfileForm = ({ onPictureChange }) => {
  // Add onPictureChange as a prop
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const { profile, dispatch } = useContext(ProfileContext);
  // const { home, homeDispatch } = useContext(HomeContext);

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
    } else {
      toast.success('Profile updated successfully!', {
        classNames: {
          toast: 'bg-green-300',
        },
      });
    }
  
    const formData = new FormData();

    
    formData.append("name", name);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("phone", phone);
    formData.append("address", address);
    

    // Only append avatar if it's not null
    if (avatar !== null) {
      formData.append("avatar", avatar);
    } else {
      // If avatar is null, add a field to indicate that the avatar should not be updated
      formData.append("keep_avatar", true); // This can be any field name to indicate the avatar should be kept
    }
    try {

      const response = await fetch(`/profile/${user.userId}`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      // const homeResponse = await fetch(`/home/updateHome/currentMembers/${user.userId}`, {
      //   method: "PATCH",
      //   body: JSON.stringify({
      //     userId: user.userId,
      //     name: name
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // });

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
    return (
      <div className="flex h-screen items-center justify-between">
        <p className="flex w-40 mx-auto font-2xl bg-slate-200 p-4 rounded-lg ">
          <CircularProgress className="mr-4" />
          Loading...
        </p>
      </div>
    );
  }

  return (
    <>
      <form
      className="grid lg:grid-cols-2 m-4 gap-8 lg:w-1/2 sm:w-3/4 sm:grid-cols-1"
      onSubmit={handleSubmit}>
        {/* <Box sx={{width: '100%'}}>
          <LinearProgressWithLabel value={value} />
        </Box> */}
        <div className="flex items-center justify-between lg:col-span-2 sm:col-span-1">
          <label className="text-zinc-100 text-2xl mr-4">Avatar:</label>
          <input
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
            accept="profilePictures/*"
            className="w-10/12 bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between col-span-1">
          <label className="text-zinc-100 text-2xl mr-4">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={emptyFields.includes("name") ? "error" : "w-2/3 bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
          />
        </div>
        <label className="flex text-zinc-100 text-2xl ml-0 items-center justify-between">Email: {user.email}</label>
        <div className="flex items-center justify-between col-span-1">
          <label className="text-zinc-100 text-2xl mr-4">Age:</label>
          <input
            type="number"
            value={age || ""}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className={emptyFields.includes("age") ? "error" : "w-2/3 bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
          />
        </div>
        <div className="flex items-center justify-between col-span-1">
          <label className="text-zinc-100 text-2xl mr-4">
            Gender:
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={emptyFields.includes("gender") ? "error" : "w-2/3 bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex items-center justify-between col-span-1">
          <label className="text-zinc-100 text-2xl mr-4">Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={emptyFields.includes("phone") ? "error" : "w-2/3 bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
          />
        </div>
        <div className="flex items-center justify-between col-span-1">
          <label className="text-zinc-100 text-2xl mr-4">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={emptyFields.includes("address") ? "error" : "w-2/3 bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
          />
        </div>
        <button
          className="col-span-2 mt-2 p-2 bg-accent text-zinc-800 rounded-2xl w-full hover:opacity-90"
          type="submit">Update Profile</button>
        {error && <div className="error">{error}</div>}
        <div className="col-span-1">
          <Toaster />
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
