import React from 'react';

const ExpenseTagDropdown = ({ expenseTags, selectedTag, setSelectedTag }) => {
  return (
    <div className="grid grid-cols-8 mb-4">
      <label htmlFor="expenseTag" className="flex items-center mr-4 text-xl col-span-2">Select Tag:</label>
      <select
        id="expenseTag"
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
        className="col-span-6 p-2 bg-tertiary-dark-bg text-zinc-200 rounded-xl"
      >
        <option value="">Select a tag</option>
        {expenseTags.map((tag, index) => (
          <option key={index} value={tag}>{tag}</option>
        ))}
      </select>
    </div>
  );
};

export default ExpenseTagDropdown;
