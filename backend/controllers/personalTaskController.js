const PersonalTask = require('../models/personalTaskModel')
const mongoose = require('mongoose')

// get all expenses
const getTasks = async (req, res) => {
  const user_id = req.user._id
  const tasks = await PersonalTask.find({user_id}).sort({createdAt: -1})
  res.status(200).json(tasks)
}

// get a single task
const getTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such task'})
  }

  const task = await PersonalTask.findById(id)
  console.log(task)

  if (!task) {
    return res.status(404).json({error: 'No such task'})
  }

  res.status(200).json(task)
}

// create a new task
const createTask = async (req, res) => {
  const {title, description, deadline, completed} = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!description) {
    emptyFields.push('description')
  }
  if (!deadline) {
    emptyFields.push('deadline')
  }
  if (emptyFields.includes('title')  ) {
    return res.status(400).json({ error: 'Title is required', emptyFields })
  }

  // add to the database

  try {
    const user_id = req.user._id
    const task = await PersonalTask.create({ title, description, deadline, completed, user_id })
    res.status(200).json(task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such task'})
  }

  const task = await PersonalTask.findOneAndDelete({_id: id})

  if(!task) {
    return res.status(400).json({error: 'No such task'})
  }

  res.status(200).json(task)
}

// update a task
const updateTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such task'})
  }

  const task = await PersonalTask.findOneAndUpdate({_id: id}, {
    ...req.body
  })
  console.log(task);

  if (!task) {
    return res.status(400).json({error: 'No such task'})
  }

  res.status(200).json(task)
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
}