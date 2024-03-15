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
    const name = user.name;
    const age = user.age;
    const phone = user.phone;
    const address = user.address;
    const gender = user.gender;
    const avatar = user.avatar;
    const token = createToken(userId);
    res.status(200).json({ userId, email, token, name, age, phone, address, gender, avatar});
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
    const name = user.name;
    const age = user.age;
    const phone = user.phone;
    const address = user.address;
    const gender = user.gender;
    const avatar = user.avatar;
    const token = createToken(userId);
    res.status(200).json({ userId, email, token, name, age, phone, address, gender, avatar});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




module.exports = { loginUser, signupUser};
