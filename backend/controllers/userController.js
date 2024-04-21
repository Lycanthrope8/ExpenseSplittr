const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const UserProfile = require("../models/userProfileModel");

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
    res.status(200).json({ userId, email, token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  const keyword = req.query.search
    ? { email: { $regex: req.query.search, $options: "i" } }
    : {};

  try {
    const users = await User.find({ ...keyword, _id: { $ne: req.user._id } });

    // Fetch name and avatar from UserProfile for each user
    const usersWithProfile = await Promise.all(users.map(async (user) => {
      const userProfile = await UserProfile.findOne({ userId: user._id }).select('name avatar');
      return { ...user.toObject(), name: userProfile.name, avatar: userProfile.avatar };
    }));

    console.log(usersWithProfile);
    res.send(usersWithProfile);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//Signup User
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const userId = user._id;
    const token = createToken(userId);
    res.status(200).json({ userId, email, token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



 
module.exports = { loginUser, signupUser,getAllUsers};
