const express = require('express');
const upload = require('../middleware/multerMiddleware');

//Controller functions
const {getUserProfile, createUserProfile, updateUserProfile} = require('../controllers/userProfileController');

const router = express.Router();

// User Profile Route
router.get('/:userId', getUserProfile);

// Create User Profile Route with avatar upload
router.post('/:userId', upload.single('avatar'), createUserProfile);

// Update User Profile Route with avatar upload
router.patch('/:userId', upload.single('avatar'), updateUserProfile);

module.exports = router;
