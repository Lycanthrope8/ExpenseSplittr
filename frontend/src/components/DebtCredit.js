import { useEffect, useState } from 'react';
import { useProfileContext } from '../hooks/useProfileContext';

const DebtCredit = () => {
    const { profile } = useProfileContext();

    const [debts, setDebts] = useState([]);
    const [credits, setCredits] = useState([]);
    const [totalDebt, setTotalDebt] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    const [formattedDebtors, setFormattedDebtors] = useState([]);
    const [formattedCreditors, setFormattedCreditors] = useState([]);

    useEffect(() => {
        const fetchDebtCredit = async () => {
            try {
                const response = await fetch(`/api/debtorCreditor/${profile.userId}`);
                const json = await response.json();
                setDebts(json.debts);
                setCredits(json.credits);
                setTotalDebt(json.totalDebt);
                setTotalCredit(json.totalCredit);

                // Format debtors
                const formattedDebtors = json.credits.reduce((debtors, credit) => {
                    const debtor = credit.debtor;
                    if (!debtors.some(item => item.userId === debtor.userId)) {
                        debtors.push(debtor);
                    }
                    return debtors;
                }, []);
                setFormattedDebtors(formattedDebtors);

                // Format creditors
                const formattedCreditors = json.debts.reduce((creditors, debt) => {
                    const creditor = debt.creditor;
                    if (!creditors.some(item => item.userId === creditor.userId)) {
                        creditors.push(creditor);
                    }
                    return creditors;
                }, []);
                setFormattedCreditors(formattedCreditors);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDebtCredit();
    }, [profile.userId]);

    const handleSettle = async () => {
        return;
    }
    const handleConfirmSettlement = async () => {
        return;
    }
    const handleDeclineSettlement = async () => {
        return;
    }

    return (
        <div className='text-text'>
            <h2>You owe money to</h2>
            <ul>
                {formattedCreditors.map(creditor => (
                    (!creditor.settled &&
                    <li key={creditor.userId}>
                        <span>Name: {creditor.name}</span>
                        <span>Title: {debts.find(debt => debt.creditor.userId === creditor.userId)?.title || "N/A"}</span>
                        <span>Tag: {debts.find(debt => debt.creditor.userId === creditor.userId)?.tag || "N/A"}</span>
                        <span>Amount: {debts.find(debt => debt.creditor.userId === creditor.userId)?.amount || "N/A"}</span>
                        {!debts.find(debt => debt.creditor.userId === creditor.userId).UnderSettlement &&<button onClick={handleSettle}>Settle</button>}
                    </li>)
                ))}
            </ul>
            <h2>You are owed money from</h2>
            <ul>
                {formattedDebtors.map(debtor => (
                    (!debtor.settled &&
                    <li key={debtor.userId}>
                        <span>Name: {debtor.name}</span>
                        <span>Title: {credits.find(credit => credit.debtor.userId === debtor.userId)?.title || "N/A"}</span>
                        <span>Tag: {credits.find(credit => credit.debtor.userId === debtor.userId)?.tag || "N/A"}</span>
                        <span>Amount: {credits.find(credit => credit.debtor.userId === debtor.userId)?.amount || "N/A"}</span>
                        {!credits.find(credit => credit.debtor.userId === debtor.userId)?.UnderSettlement &&<div>
                        <button onClick={handleConfirmSettlement}>Confirm Settlement</button>
                        <button onClick={handleDeclineSettlement}>Decline Settlement</button>
                        </div>}
                    </li>)
                ))}
            </ul>
        </div>
    );
}

export default DebtCredit;
