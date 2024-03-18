import { useState, useEffect, useContext } from "react";
import { CreateHomeContext } from "../context/CreateHomeContext";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateHomeForm = () => {
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();
  const { CreateHome, dispatch } = useContext(CreateHomeContext);

  useEffect(() => {
    if (CreateHome) {
      setName(CreateHome.name || "");
      setLocation(CreateHome.location || "");
      setAccommodationType(CreateHome.accommodationType || "");
      setBedrooms(CreateHome.bedrooms || 0);
      setBathrooms(CreateHome.bathrooms || 0);
      setRentAmount(CreateHome.rentAmount || 0);
      setUtilitiesIncluded(CreateHome.utilitiesIncluded || false);
      setFurnished(CreateHome.furnished || false);
      setPetsAllowed(CreateHome.petsAllowed || false);
      setSmokingAllowed(CreateHome.smokingAllowed || false);
      setMoveInDate(CreateHome.moveInDate || "");
      setImages(CreateHome.images || []);
      setHouseRules(CreateHome.houseRules || []);
    }
  }, [CreateHome]);

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
    // console.log("Form Data:", formData);

    
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("location", location);
    // formData.append("accommodationType", accommodationType);
    // formData.append("bedrooms", bedrooms);
    // formData.append("bathrooms", bathrooms);
    // formData.append("rentAmount", rentAmount);
    // formData.append("utilitiesIncluded", utilitiesIncluded);
    // formData.append("furnished", furnished);
    // formData.append("petsAllowed", petsAllowed);
    // formData.append("smokingAllowed", smokingAllowed);
    // formData.append("moveInDate", moveInDate);
    // images.forEach((image) => formData.append("images", image));
    // formData.append("owner_id", userId);
    // houseRules.forEach((rule) => formData.append("houseRules", rule));
    
    try {
      const response = await fetch(`/home/createHome`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      } else {
        setEmptyFields([]);
        setError(null);
        dispatch({ type: "CREATE_HOME", payload: json });
      }
    } catch (error) {
      setError("Error creating Home");
    }
  };

  return (
    <form className="grid grid-cols-2 m-4" onSubmit={handleSubmit}>
      {/* Input fields */}
      {/* Name */}
      <div>
        <label className="block text-zinc-100 text-xl ml-0">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {/* Location */}
      <div>
        <label className="block text-zinc-100 text-xl ml-0">Location:</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      {/* Accommodation Type */}
      <div>
        <label className="block text-zinc-100 text-xl ml-0">
          Accommodation Type:
        </label>
        <input
          type="text"
          name="accommodationType"
          value={accommodationType}
          onChange={(e) => setAccommodationType(e.target.value)}
        />
      </div>
      {/* Bedrooms */}
      <div>
        <label className="block text-zinc-100 text-xl ml-0">Bedrooms:</label>
        <input
          type="number"
          name="bedrooms"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
      </div>
      {/* Bathrooms */}
      <div>
        <label className="block text-zinc-100 text-xl ml-0">Bathrooms:</label>
        <input
          type="number"
          name="bathrooms"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        />
      </div>
      {/* Rent Amount */}
      <div>
        <label className="block text-zinc-100 text-xl ml-0">Rent Amount:</label>
        <input
          type="number"
          name="rentAmount"
          value={rentAmount}
          onChange={(e) => setRentAmount(e.target.value)}
        />
      </div>
      {/* Utilities Included */}
      <div>
        <label className="block text-zinc-100 text-xl ml-0">
          Utilities Included:
        </label>
        <input
          type="checkbox"
          name="utilitiesIncluded"
          checked={utilitiesIncluded}
          onChange={(e) => setUtilitiesIncluded(e.target.checked)}
        />
      </div>
      {/* Furnished */}
      <div>
        <label className="block text-zinc-100 text-xl ml-0">Furnished:</label>
        <input
          type="checkbox"
          name="furnished"
          checked={furnished}
          onChange={(e) => setUtilitiesIncluded(e.target.checked)}
        />
      </div>
      {/* Pets Allowed */}
      <div>
        <label className="block text-zinc-100 text-xl ml-0">
          Pets Allowed:
        </label>
        <input
          type="checkbox"
          name="petsAllowed"
          checked={petsAllowed}
          onChange={(e) => setPetsAllowed(e.target.checked)}
        />
      </div>
      {/* Smoking Allowed */}
      <div>
        <label className="block text-zinc-100 text-xl ml-0">
          Smoking Allowed:
        </label>
        <input
          type="checkbox"
          name="smokingAllowed"
          checked={smokingAllowed}
          onChange={(e) => setSmokingAllowed(e.target.checked)}
        />
      </div>
      {/* Move In Date */}
      <div>
        <label className="block text-zinc-100 text-xl ml-0">
          Move In Date:
        </label>
        <input
          type="date"
          name="moveInDate"
          value={moveInDate}
          onChange={(e) => setMoveInDate(e.target.value)}
        />
      </div>
      {/* Images */}
      <div>
        <label className="block text-zinc-100 text-xl ml-0">Images:</label>
        <input
          type="file"
          name="images"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />
      </div>
      {/* House Rules */}
      <div>
        <label className="block text-zinc-100 text-xl ml-0">House Rules:</label>
        <input
          type="text"
          name="houseRules"
          value={houseRules}
          onChange={(e) => setHouseRules(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button
        className="col-span-2 mt-2 p-2 bg-accent text-zinc-800 rounded-2xl w-full hover:opacity-90"
        type="submit"
      >
        Create Home
      </button>

      {/* Error Message */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CreateHomeForm;
