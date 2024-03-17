const express = require('express');
const router = express.Router();

// Controller functions
const { getHomeById, createHome, getAllHomes, updateHomeById } = require('../controllers/homeController');

router.post('/createHome', createHome);
router.get('/all', getAllHomes);
router.get('/:id', getHomeById);
router.patch('/:id', updateHomeById);



module.exports = router;