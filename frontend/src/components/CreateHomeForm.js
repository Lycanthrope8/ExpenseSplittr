import { useState, useEffect, useContext } from "react";
import { CreateHomeContext } from "../context/CreateHomeContext";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateHomeForm = () => {
  // Add onPictureChange as a prop
  
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const { CreateHome, dispatch } = useContext(CreateHomeContext);

  useEffect(() => {
    if (CreateHome) {
      setLoading(false);
      setName(CreateHome.name || "");
      setLocation(CreateHome.location || "");
      setAccommodationType(CreateHome.accommodationType || "");
      setBedrooms(CreateHome.bedrooms || "");
      setBathrooms(CreateHome.bathrooms || "");
      setRentAmount(CreateHome.rentAmount || "");

      setUtilitiesIncluded(CreateHome.utilitiesIncluded || "");
      setFurnished(CreateHome.furnished || "");
      setPetsAllowed(CreateHome.petsAllowed || "");
      setSmokingAllowed(CreateHome.smokingsAllowed || "");
      setMoveInDate(CreateHome.moveInDate || "");
      setImages(CreateHome.images || "");
      setHouseRules(CreateHome.houseRules || "");
    
      
      

    }
  }, [CreateHome]);


  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [accommodationType, setAccommodationType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [utilitiesIncluded, setUtilitiesIncluded] = useState("");
  const [furnished, setFurnished] = useState("");
  const [petsAllowed, setPetsAllowed] = useState("");
  const [smokingsAllowed, setSmokingAllowed] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [images, setImages] = useState("");
  const [houseRules, setHouseRules] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to create your Home");
      return;
    }

    const formData = {name, location, accommodationType, bedrooms, bathrooms, rentAmount, utilitiesIncluded, furnished, petsAllowed, smokingsAllowed, moveInDate, images, houseRules, owner_id: user.userId}

    // formData.append("name", name);
    // formData.append("location", location);  
    // formData.append("accommodationType", accommodationType);
    // formData.append("bedrooms", bedrooms);
    // formData.append("bathrooms", bathrooms);
    // formData.append("rentAmount", rentAmount);
    // formData.append("utilitiesIncluded", utilitiesIncluded);
    // formData.append("furnished", furnished);
    // formData.append("petsAllowed", petsAllowed);
    // formData.append("smokingAllowed", smokingsAllowed);
    // formData.append("moveInDate", moveInDate);
    // formData.append("images", images);
    // formData.append("owner_id", user.userId);
    // formData.append("houseRules", houseRules);
    console.log(formData);

    try {
      const response = await fetch(`/home/createHome`, {
        method: "POST",
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
         dispatch({ type: "CREATE_HOME", payload: json });

        // Update profile picture URL if a new picture is uploaded
        
      }
    } catch (error) {
      setError("Error creating Home");
    }
  };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

  return (
    <form className="grid grid-cols-2 m-4" onSubmit={handleSubmit}>
    
      <div>
        <label className="block text-zinc-100 text-xl ml-0">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        //   className={emptyFields.includes("name") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
        />
      </div>
        <div>
            <label className="block text-zinc-100 text-xl ml-0">Location:</label>
            <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            // className={emptyFields.includes("location") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
            />
        </div>
        <div>
            <label className="block text-zinc-100 text-xl ml-0">Accommodation Type:</label>
            <input
            type="text"
            value={accommodationType}
            onChange={(e) => setAccommodationType(e.target.value)}
            // className={emptyFields.includes("accommodationType") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
            />
        </div>
        <div>
            <label className="block text-zinc-100 text-xl ml-0">Bedrooms:</label>
            <input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            // className={emptyFields.includes("bedrooms") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
            />
        </div>
        <div>
            <label className="block text-zinc-100 text-xl ml-0">Bathrooms:</label>
            <input
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            // className={emptyFields.includes("bathrooms") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
            />
        </div>
        <div>
            <label className="block text-zinc-100 text-xl ml-0">Rent Amount:</label>
            <input
            type="number"
            value={rentAmount}
            onChange={(e) => setRentAmount(e.target.value)}
            // className={emptyFields.includes("rentAmount") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
            />
        </div>
        <div>
            <label className="block text-zinc-100 text-xl ml-0">Utilities Included:</label>
            <input
            type="boolean"
            value={utilitiesIncluded}
            onChange={(e) => setUtilitiesIncluded(e.target.value)}
            // className={emptyFields.includes("utilitiesIncluded") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
            />
        </div>
        <div>
            <label className="block text-zinc-100 text-xl ml-0">Furnished:</label>
            <input
            type="boolean"
            value={furnished}
            onChange={(e) => setFurnished(e.target.value)}
            // className={emptyFields.includes("furnished") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
            />
        </div>
        <div>
            <label className="block text-zinc-100 text-xl ml-0">Pets Allowed:</label>
            <input
            type="boolean"
            value={petsAllowed}
            onChange={(e) => setPetsAllowed(e.target.value)}
            // className={emptyFields.includes("petsAllowed") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
            />
        </div>
        <div>
            <label className="block text-zinc-100 text-xl ml-0">Smoking Allowed:</label>
            <input
            type="boolean"
            value={smokingsAllowed}
            onChange={(e) => setSmokingAllowed(e.target.value)}
            // className={emptyFields.includes("smokingsAllowed") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
            />
        </div>
        <div>
            <label className="block text-zinc-100 text-xl ml-0">Move In Date:</label>
            <input
            type="date"
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
            // className={emptyFields.includes("moveInDate") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
            />
        </div>
        <div>
            <label className="block text-zinc-100 text-xl ml-0">Images:</label>
            <input
            type="text"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            // className={emptyFields.includes("images") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
            />
        </div>
        <div>
            <label className="block text-zinc-100 text-xl ml-0">House Rules:</label>
            <input
            type="text"
            value={houseRules}
            onChange={(e) => setHouseRules(e.target.value)}
            // className={emptyFields.includes("houseRules") ? "error" : "block w-full bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"}
            />
        </div>
       
       

      <button className="col-span-2 mt-2 p-2 bg-accent text-zinc-800 rounded-2xl w-full hover:opacity-90" type="submit">Create Home</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CreateHomeForm;
