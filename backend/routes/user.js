const express = require('express');

//Controller functions
const {loginUser, signupUser, getUserProfile, updateUserProfile} = require('../controllers/userController');

const router = express.Router();


// Login Route
router.post('/login', loginUser);


// Signup Route
router.post('/signup', signupUser);

// User Profile Route
router.get('/profile/:userId', getUserProfile);

// Update User Profile Route
router.patch('/profile/:userId', updateUserProfile);


module.exports = router;