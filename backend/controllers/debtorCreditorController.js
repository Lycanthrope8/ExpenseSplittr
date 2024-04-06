const DebtorCreditor = require("../models/debtorCreditorModel");

const getDebtorCreditor = async (req, res) => {
    const userId = req.params.id;
    const debts = await DebtorCreditor.find({ "debtor.userId": userId });
    const credits = await DebtorCreditor.find({ "creditor.userId": userId });
    res.status(200).json({ debts, credits });
    }

const postDebtorCreditor = async (req, res) => {
    const { debtorId, creditorId } = req.body;
    const debtor = await DebtorCreditor.findById(debtorId);
    const creditor = await DebtorCreditor.findById(creditorId);
    const amount = Math.min(debtor.amount, creditor.amount);
    debtor.amount -= amount;
    creditor.amount -= amount;
    await debtor.save();
    await creditor.save();
    res.status(200).json({ debtor, creditor });
}


module.exports = {getDebtorCreditor, postDebtorCreditor};