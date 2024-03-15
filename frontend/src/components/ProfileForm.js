import { useState } from "react";
import { useProfileForm } from "../hooks/useProfileForm";
import { useAuthContext } from "../hooks/useAuthContext";

const ProfileForm = () => {
  const { profile, dispatch } = useProfileForm();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();
  const [name, setName] = useState(profile.name || "");
  const [age, setAge] = useState(profile.age || "");
  const [gender, setGender] = useState(profile.gender || "");
  const [phone, setPhone] = useState(profile.phone || "");
  const [address, setAddress] = useState(profile.address || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to update your profile");
      return;
    }
    const profileInformation = { name, age, gender, phone, address };
    const response = await fetch(`/profile/${user.userId}`, {
      method: "PATCH",
      body: JSON.stringify(profileInformation),
      headers: {
        "Content-Type": "application/json",
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
      // Update state variables with new values
      setName(json.name || "");
      setAge(json.age || "");
      setGender(json.gender || "");
      setPhone(json.phone || "");
      setAddress(json.address || "");
      // Dispatch action to update context
      dispatch({ type: "UPDATE_PROFILE", payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={emptyFields.includes("name") ? "error" : ""}
        />
      </label>
      <br />
      <label>
        Email:<h3>{user.email}</h3>
      </label>

      <br />
      <label>
        Age:
        <input
          type="number"
          value={age || ""} // Ensure empty string if age is not available
          onChange={(e) => setAge(parseInt(e.target.value))}
          className={emptyFields.includes("age") ? "error" : ""}
        />
      </label>
      <br />
      <label>
        Gender:
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className={emptyFields.includes("gender") ? "error" : ""}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <br />
      <label>
        Phone:
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={emptyFields.includes("phone") ? "error" : ""}
        />
      </label>
      <br />
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={emptyFields.includes("address") ? "error" : ""}
        />
      </label>
      <button type="submit">Update Profile</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProfileForm;
