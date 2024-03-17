import React, { useState } from 'react';

const SortButton = ({ onSort }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSort = (option) => {
    setSelectedOption(option);
    onSort(option);
  };

  return (
    <div className='sort-button absolute end-0 h-10'>
      <select className='rounded-lg p-1 bg-secondary-dark-bg text-zinc-100 focus:outline-none' value={selectedOption} onChange={(e) => handleSort(e.target.value)}>
        <option value=''>Sort By</option>
        <option value='amount-low-high'>Amount: Low to High</option>
        <option value='amount-high-low'>Amount: High to Low</option>
        <option value='date-recent'>Date: Most Recent</option>
        <option value='date-least-recent'>Date: Least Recent</option>
      </select>
    </div>
  );
};

export default SortButton;
