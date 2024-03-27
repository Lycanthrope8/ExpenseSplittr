const express = require('express')
const {
  getExpenses, 
  getExpense, 
  createExpense, 
  deleteExpense, 
  updateExpense
} = require('../controllers/homeExpenseController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// requireAuth middleware is used to protect the routes
router.use(requireAuth)

// GET all expenses
router.get('/:id', getExpenses)

// GET a single expense
router.get('/:id', getExpense)

// POST a new expense
router.post('/', createExpense)

// DELETE a expense
router.delete('/:id', deleteExpense)

// UPDATE a expense
router.patch('/:id', updateExpense)

module.exports = router