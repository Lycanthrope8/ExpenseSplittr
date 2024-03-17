const express = require('express');
// const requireAuth = require('../middleware/requireAuth')

//Controller functions
const {loginUser, signupUser} = require('../controllers/userController');


const router = express.Router()

// requireAuth middleware is used to protect the routes
// router.use(requireAuth)


// Login Route
router.post('/login', loginUser);


// Signup Route
router.post('/signup', signupUser);




module.exports = router;