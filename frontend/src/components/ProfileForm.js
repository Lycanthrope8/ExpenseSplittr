import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../context/ProfileContext"; // Update the path accordingly
import { useAuthContext } from "../hooks/useAuthContext";

const ProfileForm = () => {
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const { profile, dispatch } = useContext(ProfileContext);

  useEffect(() => {
    if (profile) {
      setLoading(false);
      // Set form input values when profile changes
      setName(profile.name || "");
      setAge(profile.age || "");
      setGender(profile.gender || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
    }
  }, [profile]);

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
      dispatch({ type: "SET_PROFILE", payload: json });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
          value={age || ""}
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
