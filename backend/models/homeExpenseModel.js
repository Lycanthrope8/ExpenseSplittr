const mongoose = require('mongoose')
const Schema = mongoose.Schema

const homeExpenseSchema = new Schema({
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
  },
  home_id: {
    type: String,
    required: true
  },
  beneficiaries: [{
    userId: String,
    name: String
  }],
}, { timestamps: true })

module.exports = mongoose.model('HomeExpense', homeExpenseSchema)