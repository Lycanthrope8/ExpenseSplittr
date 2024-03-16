
const express = require('express');

//Controller functions
const {getUserProfile, createUserProfile, updateUserProfile} = require('../controllers/userProfileController');

const router = express.Router();

// User Profile Route
router.get('/:userId', getUserProfile);

// Create User Profile Route
router.post('/:userId', createUserProfile);

// Update User Profile Route
router.patch('/:userId', updateUserProfile);

module.exports = router;