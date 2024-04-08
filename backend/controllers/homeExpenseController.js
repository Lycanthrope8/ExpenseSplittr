const e = require("express");
const HomeExpense = require("../models/homeExpenseModel");
const DebtorCreditor = require("../models/debtorCreditorModel");
const UserProfile = require("../models/userProfileModel");
const PersonalExpense = require("../models/personalExpenseModel");
const mongoose = require("mongoose");

// get all expenses
const getExpenses = async (req, res) => {
  const home_id = req.params.id; // Retrieve homeId from query parameters
  const expenses = await HomeExpense.find({ home_id }).sort({ createdAt: -1 });
  // console.log(expenses);
  res.status(200).json(expenses);
};

// get a single expense
const getExpense = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such expense" });
  }

  const expense = await HomeExpense.findById(id);

  if (!expense) {
    return res.status(404).json({ error: "No such expense" });
  }

  res.status(200).json(expense);
};

// create a new expense
const createExpense = async (req, res) => {
  // console.log(req.body)
  const { title, amount, tag, home_id, user_id, beneficiaries } = req.body;
  const userProfile = await UserProfile.findOne({ userId: user_id });
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!amount) {
    emptyFields.push("amount");
  }
  if (!tag) {
    emptyFields.push("Untagged");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database

  try {
    const amountPerBeneficiary = amount / beneficiaries.length;
    const expense = await HomeExpense.create({
      title,
      amount,
      tag,
      user_id,
      home_id,
      beneficiaries,
    });
    const debtorCreditor = beneficiaries.map(async (beneficiary) => {
      if (beneficiary.userId !== user_id) {
        const creditor = { userId: user_id, name: userProfile.name };
        const debtor = beneficiary;
        const expenseId = expense._id;
        const title = expense.title;
        const tag = expense.tag;
        const amount = amountPerBeneficiary;
        const debtorCreditor = await DebtorCreditor.create({
          creditor,
          debtor,
          expense: expenseId,
          title,
          tag,
          amount,
        });
        return debtorCreditor;
      } else {
        const personalExpense = await PersonalExpense.create({
          title,
          amount: amountPerBeneficiary,
          tag,
          user_id,
        });
        return personalExpense;
      }
    });
    console.log(debtorCreditor);
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a expense
const deleteExpense = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such expense" });
  }

  const expense = await HomeExpense.findOneAndDelete({ _id: id });

  if (!expense) {
    return res.status(400).json({ error: "No such expense" });
  }

  // If the deleted expense had beneficiaries, remove related entries from DebtorCreditor
  if (expense.beneficiaries && expense.beneficiaries.length > 0) {
    try {
      await DebtorCreditor.deleteMany({ expense: id });
    } catch (error) {
      console.error("Error deleting related DebtorCreditor entries:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  res.status(200).json(expense);
};


// update a expense
const updateExpense = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such expense" });
  }

  const expense = await HomeExpense.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!expense) {
    return res.status(400).json({ error: "No such expense" });
  }

  res.status(200).json(expense);
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
