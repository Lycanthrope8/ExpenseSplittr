const HomeTask = require('../models/homeTaskModel')
const mongoose = require('mongoose')


// get all tasks
const getTasks = async (req, res) => {
  const home_id = req.params.id;
  const tasks = await HomeTask.find({home_id}).sort({createdAt: -1});
//   console.log(req.body);
  res.status(200).json(tasks);
};

// get a single task
const getTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such task'})
  }

  const task = await HomeTask.findById(id)
  console.log(task)

  if (!task) {
    return res.status(404).json({error: 'No such task'})
  }

  res.status(200).json(task)
}

// create a new task
const createTask = async (req, res) => {
    console.log(req.body)
  const {title, description, deadline, completed, user_id, home_id} = req.body

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
    const task = await HomeTask.create({ title, description, deadline, completed, user_id, home_id})
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

  const task = await HomeTask.findOneAndDelete({_id: id})

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

  const task = await HomeTask.findOneAndUpdate({_id: id}, {
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