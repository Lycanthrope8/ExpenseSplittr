const HomeExpense = require('../models/homeExpenseModel')
const mongoose = require('mongoose')

// get all expenses
const getExpenses = async (req, res) => {
  const { homeId } = req.query; // Retrieve homeId from query parameters
  const expenses = await HomeExpense.find({ home_id: homeId }).sort({ createdAt: -1 });
  // console.log(expenses);
  res.status(200).json(expenses);
};


// get a single expense
const getExpense = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such expense'})
  }

  const expense = await HomeExpense.findById(id)

  if (!expense) {
    return res.status(404).json({error: 'No such expense'})
  }

  res.status(200).json(expense)
}

// create a new expense
const createExpense = async (req, res) => {
  console.log(req.body)
  const {title, amount, tag, home_id, user_id} = req.body
  
  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!amount) {
    emptyFields.push('amount')
  }
  if (!tag) {
    emptyFields.push('Untagged')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database

  try {
    const expense = await HomeExpense.create({ title, amount, tag, user_id, home_id })
    res.status(200).json(expense)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a expense
const deleteExpense = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such expense'})
  }

  const expense = await HomeExpense.findOneAndDelete({_id: id})

  if(!expense) {
    return res.status(400).json({error: 'No such expense'})
  }

  res.status(200).json(expense)
}

// update a expense
const updateExpense = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such expense'})
  }

  const expense = await HomeExpense.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!expense) {
    return res.status(400).json({error: 'No such expense'})
  }

  res.status(200).json(expense)
}

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense
}