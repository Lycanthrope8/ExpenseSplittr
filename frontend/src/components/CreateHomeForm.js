import { useState,  useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Checkbox } from "@mui/material";
import grey from "@mui/material/colors/grey";

const CreateHomeForm = () => {
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [buttonLabel, setButtonLabel] = useState("Create Home"); // State for button label
  const { user } = useAuthContext();
  const { dispatch } = useContext(ProfileContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [accommodationType, setAccommodationType] = useState("");
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [rentAmount, setRentAmount] = useState(0);
  const [utilitiesIncluded, setUtilitiesIncluded] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [smokingAllowed, setSmokingAllowed] = useState(false);
  const [moveInDate, setMoveInDate] = useState("");
  const [images, setImages] = useState([]);
  const [houseRules, setHouseRules] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to create your Home");
      return;
    }
    setButtonLabel("Creating"); // Change button label to "Creating"
    const userId = user.userId;
    const formData = {
      name,
      location,
      accommodationType,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      rentAmount: parseInt(rentAmount),
      utilitiesIncluded,
      furnished,
      petsAllowed,
      smokingAllowed,
      moveInDate,
      images,
      houseRules,
      owner_id: userId,
    };
    console.log(formData);
    try {
      const response = await fetch(`/home/createHome`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
        setButtonLabel("Create Home"); // Change button label back to "Create Home"
      } else {
        setError(null);
        dispatch({
          type: "UPDATE_PROFILE",
          payload: { homeId: json.savedHome.home_id },
        });
        navigate("/home/createHome/uploadImages", { state: { homeId: json.savedHome.home_id } });  // Redirect to home page after successful creation
      }
    } catch (error) {
      setError("Error creating Home");
      setButtonLabel("Create Home"); // Change button label back to "Create Home" in case of error
    }
  };

  return (
    <div className="flex flex-col justify-center text-text">
      <h1 className="text-center text-4xl font-bold mb-8">Create Home</h1>
      <form
      className="grid lg:grid-cols-2 m-4 gap-8 lg:w-2/3 sm:w-3/4 sm:grid-cols-1 mx-auto"
      onSubmit={handleSubmit}>
        {/* Input fields */}
        {/* Name */}
        <div className="flex items-center justify-between lg:col-span-1 sm:col-span-1">
          {/* <label className="text-text text-2xl mr-4">Name:</label> */}
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-2 bg-transparent text-text border-1 border-border rounded-md"
          />
        </div>
        {/* Location */}
        <div className="flex items-center justify-between lg:col-span-1 sm:col-span-1">
          {/* <label className="text-text text-2xl mr-4">Location:</label> */}
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full p-2 bg-transparent text-text border-1 border-border rounded-md"
          />
        </div>
        {/* Accommodation Type */}
        <div className="flex items-center justify-between lg:col-span-2 sm:col-span-1">
          {/* <label className="text-text text-2xl mr-4"> Accommodation Type:</label> */}
          <input
            type="text"
            name="accommodationType"
            value={accommodationType}
            onChange={(e) => setAccommodationType(e.target.value)}
            placeholder="Accomodation Type"
            className="w-full p-2 bg-transparent text-text border-1 border-border rounded-md autofill:text-red-300"
          />
        </div>
        {/* Bedrooms */}
        <div className="flex items-center justify-between lg:col-span-1 sm:col-span-1">
          <label className="text-text text-2xl mr-4">Bedrooms:</label>
          <input
            type="number"
            name="bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-4/6 p-2 bg-transparent text-text border-1 border-border rounded-md"
          />
        </div>
        {/* Bathrooms */}
        <div className="flex items-center justify-between lg:col-span-1 sm:col-span-1">
          <label className="text-text text-2xl mr-4">Bathrooms:</label>
          <input
            type="number"
            name="bathrooms"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="w-4/6 p-2 bg-transparent text-text border-1 border-border rounded-md"
          />
        </div>
        {/* Rent Amount */}
        <div className="flex items-center justify-between lg:col-span-1 sm:col-span-1">
          <label className="text-text text-2xl mr-4">Rent:</label>
          <input
            type="number"
            name="rentAmount"
            value={rentAmount}
            onChange={(e) => setRentAmount(e.target.value)}
            className="w-4/6 p-2 bg-transparent text-text border-1 border-border rounded-md"
          />
        </div>
        {/* Utilities Included */}
        <div className="flex items-center justify-between lg:col-span-1 sm:col-span-1">
          <label className="text-text text-2xl mr-4">Utilities:</label>
          <div className="w-4/6 text-center">
            <Checkbox
              type="checkbox"
              name="utilitiesIncluded"
              checked={utilitiesIncluded}
              sx={{color: grey[300],
                '&.Mui-checked': {
                color: grey[300],}}}
              size="large"
              onChange={(e) => setUtilitiesIncluded(e.target.checked)}
            />
          </div>
        </div>
        {/* Furnished */}
        <div className="flex items-center justify-between lg:col-span-1 sm:col-span-1">
          <label className="text-text text-2xl mr-4">Furnished:</label>
          <div className="w-4/6 text-center">
            <Checkbox
              type="checkbox"
              name="furnished"
              checked={furnished}
              sx={{color: grey[300],
                '&.Mui-checked': {
                color: grey[300],}}}
              size="large"
              onChange={(e) => setFurnished(e.target.checked)}
            />
          </div>
        </div>
        {/* Pets Allowed */}
        <div className="flex items-center justify-between lg:col-span-1 sm:col-span-1">
          <label className="text-text text-2xl mr-4">Pets:</label>
          <div className="w-4/6 text-center">
            <Checkbox
              type="checkbox"
              name="petsAllowed"
              checked={petsAllowed}
              sx={{color: grey[300],
                '&.Mui-checked': {
                color: grey[300],}}}
              size="large"
              onChange={(e) => setPetsAllowed(e.target.checked)}
            />
          </div>
        </div>
        {/* Smoking Allowed */}
        <div className="flex items-center justify-between lg:col-span-1 sm:col-span-1">
          <label className="text-text text-2xl mr-4">Smoking:</label>
          <div className="w-4/6 text-center">
            <Checkbox
              type="checkbox"
              name="smokingAllowed"
              checked={smokingAllowed}
              sx={{color: grey[500],
                '&.Mui-checked': {
                color: grey[500],}}}
              size="large"
              onChange={(e) => setSmokingAllowed(e.target.checked)}
            />
          </div>
        </div>
        {/* Move In Date */}
        <div className="flex items-center justify-between lg:col-span-1 sm:col-span-1">
          <label className="text-text text-2xl mr-4">Move In Date:</label>
          <input
            type="date"
            name="moveInDate"
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
            className="w-4/6 p-2 bg-transparent text-text border-1 border-border rounded-md"
          />
        </div>
        
        {/* House Rules */}
        <div className="flex items-center justify-between lg:col-span-2 sm:col-span-1">
          <label className="text-text text-2xl mr-4">House Rules:</label>
          <input
            type="text"
            name="houseRules"
            value={houseRules}
            onChange={(e) => setHouseRules(e.target.value)}
            className="w-10/12 p-2 bg-transparent text-text border-1 border-border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          className="col-span-2 mt-2 py-4 px-2 border-1 border-border text-text rounded-lg w-full hover:opacity-90"
          type="submit"
          disabled={buttonLabel === "Creating"} // Disable button when creating
        >
          {buttonLabel}
        </button>

        {/* Error Message */}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default CreateHomeForm;
