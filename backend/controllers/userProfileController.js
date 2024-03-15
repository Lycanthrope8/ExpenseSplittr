const User = require("../models/userModel");


// Get User Profile
const getUserProfile = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update User
const updateUserProfile = async (req, res) => {
  const userId = req.params.userId;
  const { name, age, gender, phone, address, avatar } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, age, gender, phone, address, avatar },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {getUserProfile, updateUserProfile };