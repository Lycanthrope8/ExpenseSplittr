const UserProfile = require("../models/userProfileModel");

// Get UserProfile Profile
const getUserProfile = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await UserProfile.findOne({ userId });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create UserProfile
const createUserProfile = async (req, res) => {
  const userId = req.params.userId;
  const { name, age, gender, phone, address } = req.body;
  const avatar = req.file ? req.file.path : ''; 
  try {
    const newUser = await UserProfile.create({
      name,
      age,
      gender,
      phone,
      address,
      avatar, // Save avatar path to the database
      userId,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.params.userId;
  const { name, age, gender, phone, address } = req.body;
  let updateFields = { name, age, gender, phone, address };
  if (req.file) {
    updateFields.avatar = req.file.path;
  }

  try {
    const updatedUser = await UserProfile.findOneAndUpdate(
      { userId: userId },
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Add Tag to UserProfile
const addTagToUserProfile = async (req, res) => {
  const userId = req.params.userId;
  const { tag } = req.body;

  try {
    const userProfile = await UserProfile.findOne({ userId });
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    await userProfile.addExpenseTags([tag]); // Call addExpenseTags method
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove Tag from UserProfile
const removeTagFromUserProfile = async (req, res) => {
  const userId = req.params.userId;
  const { tag } = req.body;

  try {
    const userProfile = await UserProfile.findOne({ userId });
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    await userProfile.removeExpenseTags([tag]); // Call removeExpenseTags method
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { 
  getUserProfile, 
  createUserProfile, 
  updateUserProfile, 
  addTagToUserProfile, 
  removeTagFromUserProfile 
};

