const express = require('express');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//controller functions

const { getDebtorCreditor, postDebtorCreditor, updateSettledStatus, updateUnderSettlementStatus } = require('../controllers/debtorCreditorController');

router.get('/:id', getDebtorCreditor);
router.post('/:id', postDebtorCreditor);

router.patch('/settled/:id', updateSettledStatus);
router.patch('/underSettlement/:id', updateUnderSettlementStatus);

module.exports = router;
