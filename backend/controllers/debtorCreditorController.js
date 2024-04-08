const DebtorCreditor = require("../models/debtorCreditorModel");
const PersonalExpense = require('../models/personalExpenseModel')


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




const updateSettledStatus = async (req, res) => {
    const { id } = req.params; 
    const { settled } = req.body;
    try {
        const debtorCreditor = await DebtorCreditor.findById(id);
        if (!debtorCreditor) {
            return res.status(404).json({ message: 'Debtor-creditor entry not found' });
        }
        debtorCreditor.settled = settled;
        await debtorCreditor.save();
        const debts = await DebtorCreditor.find({ "debtor.userId": debtorCreditor.debtor.userId });
        const credits = await DebtorCreditor.find({ "creditor.userId": debtorCreditor.creditor.userId });
        // console.log({ debts, credits })
        const expense = {
            title: `Debt paid to ${debtorCreditor.creditor.name} for ${debtorCreditor.title}`,
            amount: debtorCreditor.amount,
            tag: debtorCreditor.tag,
            user_id: debtorCreditor.debtor.userId
          };
          
        const addToPersonalExpense = await PersonalExpense.create(expense)
        // console.log(addToPersonalExpense)
        if (!addToPersonalExpense) {
            return res.status(404).json({ message: 'Failed to entry personal Expense' });
        }
        res.status(200).json({ debts, credits });
    } catch (error) {
        console.error('Error updating settled status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const updateUnderSettlementStatus = async (req, res) => {
    const { id } = req.params; 
    const { UnderSettlement } = req.body; 
    try {
        const debtorCreditor = await DebtorCreditor.findById(id);
        if (!debtorCreditor) {
            return res.status(404).json({ message: 'Debtor-creditor entry not found' });
        }
        debtorCreditor.UnderSettlement = UnderSettlement;
        await debtorCreditor.save();
        const debts = await DebtorCreditor.find({ "debtor.userId": debtorCreditor.debtor.userId });
        const credits = await DebtorCreditor.find({ "creditor.userId": debtorCreditor.creditor.userId });
        // console.log({ debts, credits })
        res.status(200).json({ debts, credits });
    } catch (error) {
        console.error('Error updating underSettlement status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




module.exports = {getDebtorCreditor, postDebtorCreditor, updateSettledStatus, updateUnderSettlementStatus};