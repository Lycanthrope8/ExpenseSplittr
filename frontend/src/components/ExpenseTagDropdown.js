import React from 'react';

const ExpenseTagDropdown = ({ expenseTags, selectedTag, setSelectedTag }) => {
  return (
    <div className="mb-4">
      <label htmlFor="expenseTag" className="mr-4 text-xl">Select Tag:</label>
      <select
        id="expenseTag"
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
        className="p-2 bg-tertiary-dark-bg text-zinc-200 rounded-xl"
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
