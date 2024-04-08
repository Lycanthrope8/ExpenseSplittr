
const CreditDetails = ({credit}) => {

    return (
        <>
            <td className='align-middle py-4'>{credit.debtor.name}</td>
            <td className='text-left align-middle py-4'>{credit.title || "N/A"}</td>
            <td className='text-left align-middle py-4'>{credit.tag || "N/A"}</td>
            <td className='text-left align-middle py-4'>{credit.amount || "N/A"}</td>
        </>
    );
}

export default CreditDetails