const express = require('express');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//controller functions

const { getDebtorCreditor } = require('../controllers/debtorCreditorController');

router.get('/:id', getDebtorCreditor);

module.exports = router;
