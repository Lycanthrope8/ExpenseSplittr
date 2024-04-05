import React from 'react';
// import { Box, InputLabel, Option, FormControl, Select, colors } from '@mui/material'
import { Select, Option, Checkbox, MenuItem } from "@material-tailwind/react";
// import { OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox } from "@mui/material"

const BeneficiariesDropdown = ({ homeMembers, selectedMembers, setSelectedMembers }) => {
  // const primary = purple[500];



  return (
    <div className="flex flex-col gap-6 mb-4 [&_label]:text-text [&_label]:w-28 [&_label]:after:bg-main [&_label]:before:border-0 [&_label]:before:mr-0  [&_label]:after:border-0 [&_ul]:bg-secondary [&_ul]:border-none [&_li]:text-text [&_button]:text-text [&_button]:text-lg">
        <Select
          id = "memberId"
          value = {selectedMembers}
          variant='outlined'
          label = "Members"
          onChange = {(e) => setSelectedMembers(e)}
          className = "p-2 h-10 w-full border-1 border-border rounded-md"
        >
        {/* <Option className='text-text hover:bg-secondary/80'>Select a tag</Option> */}
        {homeMembers.map((member, index) => (
          <Option className='mb-2 hover:bg-secondary/80'
            key={index}
            value={member.userId}>
            <Checkbox checked={index > -1} />
            {member.name}
          </Option>
        ))}
        </Select>
    </div>
  );

//     const MenuProps = {};

//     const members = [];   
//     homeMembers.map((member) => (
//         members.push(member.name)
//     ));
//     console.log(members);
//     console.log(homeMembers);

//   const [memberName, setMemberName] = React.useState([]);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setMemberName(
//       // On autofill we get a stringified value.
//       typeof value === 'string' ? value.split(',') : value,
//     );

//     const MenuProps = {
//         PaperProps: {
//             style: {
//             color: 'white',
//             maxHeight: 48 * 4.5 + 8,
//             width: 250,
//             },
//         },
//         };
//   };

//   return (
//     <div className="flex flex-col gap-6 mb-4 [&_label]:text-text [&_label]:w-28 [&_label]:after:bg-main [&_label]:before:border-0 [&_label]:before:mr-0  [&_label]:after:border-0 [&_ul]:bg-secondary [&_ul]:border-none [&_li]:text-text [&_button]:text-text [&_button]:text-lg">
//       <FormControl sx={{ m: 1, width: 300 }}>
//         <InputLabel color='success'>Members</InputLabel>
//         <Select
//           id="members"
//           multiple
//           value={memberName}
//           onChange={handleChange}
//           input={<OutlinedInput label="Members" />}
//           renderValue={(selected) => selected.join(', ')}
//           MenuProps={MenuProps}
//         >
//           {members.map((member) => (
//             <MenuItem key={member} value={member}>
//               <Checkbox checked={memberName.indexOf(member) > -1} />
//               <ListItemText primary={member} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
};

export default BeneficiariesDropdown;