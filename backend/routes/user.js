const express = require('express');

//Controller functions
const {loginUser, signupUser, getAllUsers} = require('../controllers/userController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router()




// Login Route
router.post('/login', loginUser);


// Signup Route
router.post('/signup', signupUser);

// Get All Users Route
router.use(requireAuth)
router.get('/getalluser',getAllUsers);



module.exports = router;