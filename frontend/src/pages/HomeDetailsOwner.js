import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileContext } from "../hooks/useProfileContext";

export const HomeDetailsOwner = () => {
  const { profile } = useProfileContext();
  const [loading, setLoading] = useState(true);
  const [home, setHome] = useState({});
  const [formData, setFormData] = useState({});
  const { user } = useAuthContext();
  const id = profile.homeId;

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await fetch(`/home/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();

        if (response.ok) {
          setHome(json);
          setFormData({
            name: json.name,
            location: json.location,
            accommodationType: json.accommodationType,
            bedrooms: json.bedrooms,
            bathrooms: json.bathrooms,
            rentAmount: json.rentAmount,
            utilitiesIncluded: json.utilitiesIncluded,
            moveInDate: new Date(json.moveInDate).toISOString().substr(0, 10),
          });
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    if (user) {
      fetchHome();
    }
  }, [user, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send formData to update the home details
    try {
      const response = await fetch(`/home/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle successful update
        console.log("Home details updated successfully");
      } else {
        // Handle update failure
        console.error("Failed to update home details");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return loading ? (
    <div className="flex h-screen items-center">
      <p className="flex w-40 mx-auto font-2xl bg-slate-200 p-4 rounded-lg ">
        <CircularProgress className="mr-4" />
        Loading...
      </p>
    </div>
  ) : (
    <div>
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 m-4 gap-8 lg:w-1/2 sm:w-3/4 sm:grid-cols-1">
      <h4 className="text-3xl border-b-1 mb-2">Home Details</h4>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </label>
      <label>
        Accommodation Type:
        <input
          type="text"
          name="accommodationType"
          value={formData.accommodationType}
          onChange={handleChange}
        />
      </label>
      <label>
        Bedrooms:
        <input
          type="number"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
        />
      </label>
      <label>
        Bathrooms:
        <input
          type="number"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
        />
      </label>
      <label>
        Rent Amount:
        <input
          type="number"
          name="rentAmount"
          value={formData.rentAmount}
          onChange={handleChange}
        />
      </label>
      <label>
        Utilities Included:
        <input
          type="checkbox"
          name="utilitiesIncluded"
          checked={formData.utilitiesIncluded}
          onChange={handleChange}
        />
      </label>
      <label>
        Furnished:
        <input
          type="checkbox"
          name="furnished"
          checked={formData.furnished}
          onChange={handleChange}
        />
      </label>
      <label>
        Pets Allowed:
        <input
          type="checkbox"
          name="petsAllowed"
          checked={formData.petsAllowed}
          onChange={handleChange}
        />
      </label>
      <label>
        Smoking Allowed:
        <input
          type="checkbox"
          name="smokingAllowed"
          checked={formData.smokingAllowed}
          onChange={handleChange}
        />
      </label>
      <label>
        Move In Date:
        <input
          type="date"
          name="moveInDate"
          value={formData.moveInDate}
          onChange={handleChange}
        />
      </label>
      {/* Add other fields as needed */}
      <button type="submit">Update</button>
    </form>
  </div>
  
  );
};
