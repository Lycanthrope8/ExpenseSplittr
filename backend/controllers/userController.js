const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const userId = user._id;
    const token = createToken(userId);
    res.status(200).json({ userId, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Signup User
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const userId = user._id;
    const token = createToken(userId);
    res.status(200).json({ userId, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get User Profile
const getUserProfile = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId); 
    res.status(200).json(user);
  }catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update User
const updateUserProfile = async (req, res) => {
  const userId = req.params.userId;
  const { name, address, avatar } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { name, address, avatar }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser, getUserProfile, updateUserProfile };
