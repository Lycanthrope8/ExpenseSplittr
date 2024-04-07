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
        // console.log('debtorCreditor:', debtorCreditor);
        res.status(200).json({ debts, credits });
    } catch (error) {
        console.error('Error updating underSettlement status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




module.exports = {getDebtorCreditor, postDebtorCreditor, updateSettledStatus, updateUnderSettlementStatus};