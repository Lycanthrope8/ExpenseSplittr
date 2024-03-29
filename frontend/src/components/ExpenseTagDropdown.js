import React from 'react';
// import { Box, InputLabel, Option, FormControl, Select, colors } from '@mui/material'
import { Select, Option } from "@material-tailwind/react"

const ExpenseTagDropdown = ({ expenseTags, selectedTag, setSelectedTag }) => {
  // const primary = purple[500];
  return (
    <div className="flex flex-col gap-6 mb-4 [&_label]:text-text [&_label]:w-28 [&_label]:after:bg-main [&_label]:before:border-0 [&_label]:before:mr-0  [&_label]:after:border-0 [&_ul]:bg-secondary [&_ul]:border-none [&_li]:text-text [&_button]:text-text [&_button]:text-lg">
        <Select
          id = "expenseTag"
          value = {selectedTag}
          variant='outlined'
          label = "Select a tag"
          onChange = {(e) => setSelectedTag(e)}
          className = "p-2 h-10 w-full border-1 border-border rounded-md"
        >
        {/* <Option className='text-text hover:bg-secondary/80'>Select a tag</Option> */}
        {expenseTags.map((tag, index) => (
          <Option className='mb-2 hover:bg-secondary/80' key={index} value={tag}>{tag}</Option>
        ))}
        </Select>
    </div>
  );
};

export default ExpenseTagDropdown;
