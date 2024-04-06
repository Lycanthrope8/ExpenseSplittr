import { useEffect, useState } from 'react';
import { useProfileContext } from '../hooks/useProfileContext';

const DebtCredit = () => {

    const { profile } = useProfileContext();

    const [debtors, setDebtors] = useState([]);
    const [creditors, setCreditors] = useState([]);
    const [totalDebt, setTotalDebt] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);

    useEffect(() => {
        const fetchDebtCredit = async () => {
            try {
                const response = await fetch(`/api/debtorCreditor/${profile.homeId}`);
                const json = await response.json();
                setDebtors(json.debtors);
                setCreditors(json.creditors);
                setTotalDebt(json.totalDebt);
                setTotalCredit(json.totalCredit);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDebtCredit();
    }, []);

    const handleSettleDebt = async (debtorId, creditorId) => {
        try {
            const response = await fetch('/api/debtCredit', {
                method: 'POST',
                body: JSON.stringify({ debtorId, creditorId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setDebtors(json.debtors);
            setCreditors(json.creditors);
            setTotalDebt(json.totalDebt);
            setTotalCredit(json.totalCredit);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='text-text'>
            <div className='flex justify-between'>
                <h2>Debtors</h2>
                <h2>Total Debt: {totalDebt}</h2>
            </div>
            <div className='grid grid-cols-1 gap-4'>
                {debtors.map((debtor) => (
                    <div key={debtor._id} className='flex justify-between'>
                        <p>{debtor.name}</p>
                        <p>{debtor.amount}</p>
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <h2>Creditors</h2>
                <h2>Total Credit: {totalCredit}</h2>
            </div>
            <div className='grid grid-cols-1 gap-4'>
                {creditors.map((creditor) => (
                    <div key={creditor._id} className='flex justify-between'>
                        <p>{creditor.name}</p>
                        <p>{creditor.amount}</p>
                    </div>
                ))}
            </div>
            <div className='flex justify-center'>
                <button className='btn-primary' onClick={() => handleSettleDebt(debtors[0]._id, creditors[0]._id)}>Settle Debt</button>
            </div>
        </div>
    )
}

export default DebtCredit