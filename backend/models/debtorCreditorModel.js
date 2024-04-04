const mongoose = require('mongoose');
const UserProfile = require("../models/userProfileModel");
const HomeExpense = require("../models/homeExpenseModel");
const Schema = mongoose.Schema;

const debtorCreditorSchema = new Schema({
  creditor: {
    type: String,
    ref: 'UserProfile',
    required: true,
  },
  debtor: {
    type: String,
    ref: 'UserProfile',
    required: true,
  },
  expense: {
    type: String,
    ref: 'HomeExpense',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  settled: {
    type: Boolean,
    default: false,
  },
  UnderSettlement: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('DebtorCreditor', debtorCreditorSchema);
