const express = require('express');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// requireAuth middleware is used to protect the routes
router.use(requireAuth)
// Controller functions
const { getHomeById, createHome, getAllHomes, updateHomeById, joinReqHome , acceptUserRequest, rejectUserRequest } = require('../controllers/homeController');

router.post('/createHome', createHome);
router.get('/all', getAllHomes);
router.get('/:id', getHomeById);
router.patch('/uploadImages/:id', updateHomeById);
router.patch('/updateHome/:id', updateHomeById);
router.post('/joinReqHome', joinReqHome)
router.patch('/accept', acceptUserRequest)
router.patch('/reject', rejectUserRequest)




module.exports = router;