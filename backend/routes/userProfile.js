
const express = require('express');

//Controller functions
const {getUserProfile, updateUserProfile} = require('../controllers/userProfileController');

const router = express.Router();

// User Profile Route
router.get('/:userId', getUserProfile);

// Update User Profile Route
router.patch('/:userId', updateUserProfile);

module.exports = router;