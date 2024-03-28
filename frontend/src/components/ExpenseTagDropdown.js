import React from 'react';
// import { Box, InputLabel, Option, FormControl, Select, colors } from '@mui/material'
import { Select, Option } from "@material-tailwind/react"

const ExpenseTagDropdown = ({ expenseTags, selectedTag, setSelectedTag }) => {
  // const primary = purple[500];
  return (
    <div className="flex flex-col gap-6 mb-4 bg-transparent [&_label]:text-text [&_label]:w-28 [&_label]:after:bg-main [&_label]:before:border-0 [&_label]:after:border-0 [&_ul]:bg-secondary [&_ul]:border-none [&_li]:bg-secondary [&_li]:text-text">
      {/* <FormControl fullWidth color='secondary'> */}
        {/* <InputLabel className='text-slate-500' id="expenseTag">Select Tag</InputLabel>   */}
        <Select
          id = "expenseTag"
          value = {selectedTag}
          variant='outlined'
          label = "Select a tag"
          onChange = {(e) => setSelectedTag(e.target.value)}
          className = "p-2 h-10 w-full border-1 border-border rounded-md"
        >
        <Option className='text-text hover:bg-secondary/80' >Select a tag</Option>
        {expenseTags.map((tag, index) => (
          <Option className='hover:bg-secondary/80' key={index} value={tag}>{tag}</Option>
        ))}
        </Select>
      {/* </FormControl> */}
    </div>
  );
};

export default ExpenseTagDropdown;
