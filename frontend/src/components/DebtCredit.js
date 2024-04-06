import { useEffect, useState } from 'react';
import { useProfileContext } from '../hooks/useProfileContext';

const DebtCredit = () => {
    const { profile } = useProfileContext();

    const [debts, setDebts] = useState([]);
    const [credits, setCredits] = useState([]);
    const [totalDebt, setTotalDebt] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    const [formattedDebtors, setFormattedDebtors] = useState([]);

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
            } catch (error) {
                console.error(error);
            }
        };
        fetchDebtCredit();
    }, [profile.userId]);

    const handleSettleDebt = async (debtorId, creditorId) => {
        try {
            const response = await fetch(`/api/debtorCreditor/${profile.homeId}`, {
                method: 'POST',
                body: JSON.stringify({ debtorId, creditorId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setDebts(json.debts);
            setCredits(json.credits);
            setTotalDebt(json.totalDebt);
            setTotalCredit(json.totalCredit);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='text-text'>
            <h2>You owe money from</h2>
            <ul>
                {formattedDebtors.map(debtor => (
                    <li key={debtor.userId}>
                        <span>Name: {debtor.name}</span>
                        <span>Title: {credits.find(credit => credit.debtor.userId === debtor.userId).title}</span>
                        <span>Tag: {credits.find(credit => credit.debtor.userId === debtor.userId).tag}</span>
                        <span>Amount: {credits.find(credit => credit.debtor.userId === debtor.userId).amount}</span>
                        {/* <button onClick={() => handleSettleDebt(debtor.userId, profile.userId)}>Settle Debt</button> */}
                    </li>
                ))}
            </ul>
            <h2>You are in debt to</h2>
        </div>
    );
}

export default DebtCredit;
