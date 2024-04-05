const mongoose = require('mongoose');
const UserProfile = require("../models/userProfileModel");
const HomeExpense = require("../models/homeExpenseModel");
const Schema = mongoose.Schema;

const debtorCreditorSchema = new Schema({
  creditor: {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  debtor: {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  expense: {
    type: String,
    ref: 'HomeExpense',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
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
