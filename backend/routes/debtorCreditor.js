const express = require('express');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//controller functions

const { getDebtorCreditor, postDebtorCreditor } = require('../controllers/debtorCreditorController');

router.get('/:id', getDebtorCreditor);
router.post('/:id', postDebtorCreditor);

module.exports = router;
