const express = require('express');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// requireAuth middleware is used to protect the routes
router.use(requireAuth)
// Controller functions
const { getHomeById, createHome, getAllHomes, updateHomeById } = require('../controllers/homeController');

router.post('/createHome', createHome);
router.get('/all', getAllHomes);
router.get('/:id', getHomeById);
router.patch('/:id', updateHomeById);



module.exports = router;