import { useState } from "react";

import { useAuthContext } from "../hooks/useAuthContext";

const ProfileForm = () => {
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to add a expense");
      return;
    }
    const profileInformantiom = { name, age, gender, phone, address };
    const response = await fetch(`/profile/${user.userId}`, {
      method: "PATCH",
      body: JSON.stringify(profileInformantiom),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setName("");
        setAge("");
        setGender("");
        setPhone("");
        setAddress("");
        
      // dispatch({ type: "CREATE_EXPENSE", payload: json });
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
          value={age}
          onChange={(e) => setAge(e.target.value)}
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
    </form>
  );
};

export default ProfileForm;
