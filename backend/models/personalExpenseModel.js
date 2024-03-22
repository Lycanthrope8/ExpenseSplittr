const mongoose = require('mongoose')

const Schema = mongoose.Schema

const personalExpenseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('PersonalExpense', personalExpenseSchema)