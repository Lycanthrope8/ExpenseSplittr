import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";
import { useHomeContext } from "../hooks/useHomeContext";
import HomePendingRequests from "../components/HomePendingRequests";
import { useNavigate } from "react-router-dom";
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

  const [name , setName] = useState(home.name);
  const [location , setLocation] = useState(home.location);
  const [accommodationType , setAccommodationType] = useState(home.accommodationType);
  const [bedrooms , setBedrooms] = useState(home.bedrooms);
  const [bathrooms , setBathrooms] = useState(home.bathrooms);
  const [rentAmount , setRentAmount] = useState(home.rentAmount);
  const [utilitiesIncluded , setUtilitiesIncluded] = useState(home.utilitiesIncluded);
  const [furnished , setFurnished] = useState(home.furnished);
  const [petsAllowed , setPetsAllowed] = useState(home.petsAllowed);
  const [smokingAllowed , setSmokingAllowed] = useState(home.smokingAllowed);
  const [moveInDate , setMoveInDate] = useState(moment(home.moveInDate).format("YYYY-MM-DD"));

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
          {showPendingRequests ? "Show Home Details" : "Pending Requests"}
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
          <h4 className="text-3xl border-b-1 mb-2">Home Details</h4>
          <div>
            {home.images && home.images.length > 0 && (
              <div>
                {home.images.map((image, index) => (
                  <img
                    key={index}
                    src={`/${image}`}
                    alt={`Home ${home.name}`}
                    style={{
                      maxWidth: "100px",
                      marginRight: "10px",
                      border: "none",
                      margin: "0",
                      padding: "0",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <button onClick={handleUploadClick}>Upload Images</button>
          <div className="flex flex-col justify-center">
            <form
              onSubmit={handleSubmit}
              className="grid lg:grid-cols-2 m-4 gap-8 lg:w-2/3 sm:w-3/4 sm:grid-cols-1 mx-auto"
            >
              <label  className="text-zinc-100 text-2xl mr-4">
                Name:
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-4/6 bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"
                />
              </label>
              <label className="text-zinc-100 text-2xl mr-4">
                Location:
                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-4/6 bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"
                />
              </label>
              <label className="text-zinc-100 text-2xl mr-4">
                Accommodation Type:
                <input
                  type="text"
                  name="accommodationType"
                  value={accommodationType}
                  onChange={(e) => setAccommodationType(e.target.value)}
                  className="w-4/6 bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"
                />
              </label>
              <label className="text-zinc-100 text-2xl mr-4">
                Bedrooms:
                <input
                  type="number"
                  name="bedrooms"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-4/6 bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"
                />
              </label>
              <label className="text-zinc-100 text-2xl mr-4">
                Bathrooms:
                <input
                  type="number"
                  name="bathrooms"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-4/6 bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"
                />
              </label>
              <label className="text-zinc-100 text-2xl mr-4">
                Rent Amount:
                <input
                  type="number"
                  name="rentAmount"
                  value={rentAmount}
                  onChange={(e) => setRentAmount(e.target.value)}
                  className="w-4/6 bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"
                />
              </label>
              <label  className="text-zinc-100 text-2xl mr-4">
                Utilities Included:
                <input
                  type="checkbox"
                  name="utilitiesIncluded"
                  checked={utilitiesIncluded}
                  onChange={(e) => setUtilitiesIncluded(e.target.checked)}
                  className="w-4/6 bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"
                />
              </label>
              <label  className="text-zinc-100 text-2xl mr-4">
                Furnished:
                <input
                  type="checkbox"
                  name="furnished"
                  checked={furnished}
                  onChange={(e) => setFurnished(e.target.checked)}
                  className="w-4/6 bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"
                />
              </label>
              <label className="text-zinc-100 text-2xl mr-4">
                Pets Allowed:
                <input
                  type="checkbox"
                  name="petsAllowed"
                  checked={petsAllowed}
                  onChange={(e) => setPetsAllowed(e.target.checked)}
                />
              </label>
              <label className="text-zinc-100 text-2xl mr-4">
                Smoking Allowed:
                <input
                  type="checkbox"
                  name="smokingAllowed"
                  checked={smokingAllowed}
                  onChange={(e) => setSmokingAllowed(e.target.checked)}
                />
              </label>
              <label className="text-zinc-100 text-2xl mr-4">
                Move In Date:
                <input
                  type="date"
                  name="moveInDate"
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                  className="w-4/6 bg-tertiary-dark-bg text-zinc-200 rounded-xl p-2 focus:outline-none"
                />
              </label>
              <button type="submit">Update</button>
            </form>
          </div>
        </>
      )}
    </>
  );
};
