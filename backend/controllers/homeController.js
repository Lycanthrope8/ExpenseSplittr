const mongoose = require("mongoose");
const Home = require("../models/homeModel");
const UserProfile = require("../models/userProfileModel");
const { nanoid } = require('nanoid');

// Create a new home
const createHome = async (req, res) => {
  try {
    const {
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
      images,
      houseRules,
      owner_id,
    } = req.body;

    const home_id = nanoid(8);

    // Create a new home object
    const newHome = new Home({
      name,
      home_id,
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
      images,
      houseRules,
      owner_id,
    });

    // Save the new home to the database
    const savedHome = await newHome.save();
    console.log("Home Created Successfully");
    
    // Updating the user's userProfile with the homeId
    const user = await UserProfile.findOne({ userId: owner_id });
    user.homeId = savedHome.home_id; 
    const updatedUser = await user.save();
    console.log("User Updated Successfully");

    // Combine savedHome and updatedUser into a single object
    const responseData = {
      savedHome,
      updatedUser,
    };

    // Send the combined object as the response
    res.status(201).json(responseData);
  } catch (error) {
    res.status(500).json({ error: "Failed to create home" });
  }
};

// Get all homes
const getAllHomes = async (req, res) => {
  try {
    const homes = await Home.find();
    res.status(200).json(homes);
  } catch (error) {
    res.status(500).json({ error: "Failed to get homes" });
  }
};

// Get a single home by ID
const getHomeById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const home = await Home.findOne({ home_id: id });
    if (home) {
      res.status(200).json(home);
    } else {
      res.status(404).json({ error: "Home not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get home" });
  }
};

// Update a home by ID
const updateHomeById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHome = await Home.findOneAndUpdate({ home_id: id }, req.body, { new: true });

    if (updatedHome) {
      res.status(200).json(updatedHome);
    } else {
      res.status(404).json({ error: "Home not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update home" });
  }
};

// Delete a home by ID
const deleteHomeById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHome = await Home.findOne({ home_id: id });
    if (deletedHome) {
      res.status(200).json({ message: "Home deleted successfully" });
    } else {
      res.status(404).json({ error: "Home not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete home" });
  }
};

module.exports = {
  createHome,
  getAllHomes,
  getHomeById,
  updateHomeById,
  deleteHomeById,
};
