import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";
import { useHomeContext } from "../hooks/useHomeContext";
import HomePendingRequests from "../components/HomePendingRequests";
import { useNavigate } from "react-router-dom";

export const HomeDetailsOwner = () => {
  const navigate = useNavigate();
  const { profile } = useProfileContext();
  const [loading, setLoading] = useState(false);
  const [showPendingRequests, setShowPendingRequests] = useState(false);
  const [formData, setFormData] = useState({});
  const { user } = useAuthContext();
  const { home, dispatch } = useHomeContext();
  const id = profile.homeId;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
      <div>
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
          <div>
            <form
              onSubmit={handleSubmit}
              className="grid lg:grid-cols-2 m-4 gap-8 lg:w-1/2 sm:w-3/4 sm:grid-cols-1"
            >
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name || home.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={formData.location || home.location}
                  onChange={handleChange}
                />
              </label>
              <label>
                Accommodation Type:
                <input
                  type="text"
                  name="accommodationType"
                  value={formData.accommodationType || home.accommodationType}
                  onChange={handleChange}
                />
              </label>
              <label>
                Bedrooms:
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms || home.bedrooms}
                  onChange={handleChange}
                />
              </label>
              <label>
                Bathrooms:
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms || home.bathrooms}
                  onChange={handleChange}
                />
              </label>
              <label>
                Rent Amount:
                <input
                  type="number"
                  name="rentAmount"
                  value={formData.rentAmount || home.rentAmount}
                  onChange={handleChange}
                />
              </label>
              <label>
                Utilities Included:
                <input
                  type="checkbox"
                  name="utilitiesIncluded"
                  checked={formData.utilitiesIncluded || home.utilitiesIncluded}
                  onChange={handleChange}
                />
              </label>
              <label>
                Furnished:
                <input
                  type="checkbox"
                  name="furnished"
                  checked={formData.furnished || home.furnished}
                  onChange={handleChange}
                />
              </label>
              <label>
                Pets Allowed:
                <input
                  type="checkbox"
                  name="petsAllowed"
                  checked={formData.petsAllowed || home.petsAllowed}
                  onChange={handleChange}
                />
              </label>
              <label>
                Smoking Allowed:
                <input
                  type="checkbox"
                  name="smokingAllowed"
                  checked={formData.smokingAllowed || home.smokingAllowed}
                  onChange={handleChange}
                />
              </label>
              <label>
                Move In Date:
                <input
                  type="date"
                  name="moveInDate"
                  value={
                    formData.moveInDate ||
                    new Date(home.moveInDate).toISOString().substr(0, 10)
                  }
                  onChange={handleChange}
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
