import React from 'react'

const Spent = () => {
  return (
    <div className='col-span-2 grid grid-cols-2 gap-4'>
        <div className='p-8 rounded-3xl bg-[#b0d2c1]'>
            <h1>Total weekly expense</h1>
            <p>1487</p>
        </div>
        <div className='p-8 rounded-3xl bg-[#bab6c1]'>
            <h1>Total monthly expense</h1>
            <p>12, 467</p>
        </div>
    </div>
  )
}

export default Spent