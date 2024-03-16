const UserProfile = require("../models/userProfileModel");

// Get UserProfile Profile
const getUserProfile = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await UserProfile.findOne({userId});
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Create UserProfile
const createUserProfile = async (req, res) => {
  const userId = req.params.userId;
  const { name, age, gender, phone, address, avatar} = req.body;
  try {
    const newUser = await UserProfile.create({
      name,
      age,
      gender,
      phone,
      address,
      avatar,
      userId,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update UserProfile
const updateUserProfile = async (req, res) => {
  const userId = req.params.userId;
  const { name, age, gender, phone, address, avatar } = req.body;
  try {
    const updatedUser = await UserProfile.findOneAndUpdate(
      {userId: userId},
      { name, age, gender, phone, address, avatar },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUserProfile, createUserProfile, updateUserProfile };
