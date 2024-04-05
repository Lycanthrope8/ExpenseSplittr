const DebtorCreditor = require("../models/debtorCreditorModel");

const getDebtorCreditor = async (req, res) => {
    const userId = req.params.id;
    const debts = await DebtorCreditor.find({ "debtor.userId": userId });
    const credits = await DebtorCreditor.find({ "creditor.userId": userId });
    res.status(200).json({ debts, credits });
    }

module.exports = {getDebtorCreditor};