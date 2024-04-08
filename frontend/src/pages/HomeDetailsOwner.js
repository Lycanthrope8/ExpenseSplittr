import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";
import { useHomeContext } from "../hooks/useHomeContext";
import HomePendingRequests from "../components/HomePendingRequests";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import grey from "@mui/material/colors/grey";
import moment from "moment";

export const HomeDetailsOwner = () => {
  const navigate = useNavigate();
  const { profile } = useProfileContext();
  const [loading, setLoading] = useState(false);
  const [showPendingRequests, setShowPendingRequests] = useState(false);
  // const [formData, setFormData] = useState({});
  const { user } = useAuthContext();
  const { home, dispatch } = useHomeContext();
  const id = profile.homeId;

  const [name, setName] = useState(home.name);
  const [location, setLocation] = useState(home.location);
  const [accommodationType, setAccommodationType] = useState(home.accommodationType);
  const [bedrooms, setBedrooms] = useState(home.bedrooms);
  const [bathrooms, setBathrooms] = useState(home.bathrooms);
  const [rentAmount, setRentAmount] = useState(home.rentAmount);
  const [utilitiesIncluded, setUtilitiesIncluded] = useState(home.utilitiesIncluded);
  const [furnished, setFurnished] = useState(home.furnished);
  const [petsAllowed, setPetsAllowed] = useState(home.petsAllowed);
  const [smokingAllowed, setSmokingAllowed] = useState(home.smokingAllowed);
  const [moveInDate, setMoveInDate] = useState(moment(home.moveInDate).format("YYYY-MM-DD"));

  const formData = {
    name,
    location,
    accommodationType,
    bedrooms,
    bathrooms,
    rentAmount,
    utilitiesIncluded,
    furnished,
    petsAllowed,
    smokingAllowed,
    moveInDate,
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleUploadClick = () => {
    navigate("/home/createHome/uploadImages", { state: { homeId: id } });
  };

  const handleShowPendingRequests = () => {
    setShowPendingRequests(!showPendingRequests);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/home/updateHome/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedHomeData = await response.json();
        dispatch({ type: "UPDATE_HOME", payload: updatedHomeData });
      } else {
        console.error("Failed to update home details");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-text text-2xl">
        
        <button onClick={handleShowPendingRequests}>
          {showPendingRequests ? <h1 className="ml-2 flex items-center"><span className="material-symbols-outlined">arrow_back</span>Return to home details</h1> : <h1 className="ml-2">Go to Pending Requests</h1>}
        </button>
      </div>
      {loading ? (
        <div className="flex h-screen items-center">
          <p className="flex w-40 mx-auto font-2xl bg-slate-200 p-4 rounded-lg ">
            <CircularProgress className="mr-4" />
            Loading...
          </p>
        </div>
      ) : showPendingRequests ? (
        <HomePendingRequests
          pendingMembers={home.pendingMembers}
          homeId={id}
        />
      ) : (
        <>
          
          <h1 className="text-4xl mb-2 text-text text-center">Home Details</h1>
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-8 px-4">
              {home.images && home.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {home.images.map((image, index) => (
                    <img
                      key={index}
                      src={`/${image}`}
                      alt={`Home ${home.name}`}
                      // style={{
                      //   maxWidth: "100px",
                      //   marginRight: "10px",
                      //   border: "none",
                      //   margin: "0",
                      //   padding: "0",
                      // }}
                      className="size-72 rounded-lg"
                    />
                  ))}
                </div>
              )}
            <button className="text-text bg-secondary px-4 py-2 rounded-md" onClick={handleUploadClick}>Upload Images</button>
            </div>
            <div className="flex flex-col justify-center text-text">
            <form
          className="grid lg:grid-cols-2 m-4 gap-8 lg:8/12 sm:w-3/4 sm:grid-cols-1 mx-auto"
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
            
            {/* House Rules
            <div className="flex items-center justify-between lg:col-span-2 sm:col-span-1">
              <label className="text-text text-2xl mr-4">House Rules:</label>
              <input
                type="text"
                name="houseRules"
                value={houseRules}
                onChange={(e) => setHouseRules(e.target.value)}
                className="w-10/12 p-2 bg-transparent text-text border-1 border-border rounded-md"
              />
            </div> */}

            {/* Submit Button */}
            <button
              className="col-span-2 mt-2 py-4 px-2 border-1 border-border text-text rounded-lg w-full hover:opacity-90"
              type="submit">Update</button>
          </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
