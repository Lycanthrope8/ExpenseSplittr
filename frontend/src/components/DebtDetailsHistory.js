
const DebtDetailsHistory = ({debt}) => {
  
    return (
        <>
        <td className='align-middle py-4'>{debt.creditor.name}</td>
        <td className='text-left align-middle py-4'>{debt.title || "N/A"}</td>
        <td className='text-left align-middle py-4'>{debt.tag || "N/A"}</td>
        <td className='text-left align-middle py-4'>{debt.amount || "N/A"}</td>
        </>
    )
}

export default DebtDetailsHistory