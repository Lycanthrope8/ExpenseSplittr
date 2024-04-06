import React from 'react';
// import { Box, InputLabel, Option, FormControl, Select, colors } from '@mui/material'
import Select from 'react-select';
// import { OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox } from "@mui/material"

const BeneficiariesDropdown = ({ homeMembers, selectedMembers, setSelectedMembers }) => {
  // const primary = purple[500];
  const handleChange = (selectedMember) => {
    setSelectedMembers(selectedMember);
    // console.log(selectedMember);
};

return (
    <div className="mb-4">
        {/* <label htmlFor="beneficiaries" className="text-sm text-textext">Beneficiaries</label> */}
        {homeMembers && homeMembers.length > 0 && (
            <Select
                id="beneficiaries"
                isMulti
                options={homeMembers.map((member) => ({ userId: member.userId, name: member.name }))}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.userId}
                value={selectedMembers}
                placeholder="Beneficiaries"
                onChange={handleChange}
                styles={{
                    menu: (styles) => {
                        return {
                            ...styles,
                            width: '100%',
                            backgroundColor: 'hsl(240 3.7% 15.9%)',
                        };
                    },
                    control : (styles) => {
                        return {
                            ...styles,
                            backgroundColor: 'transparent',
                            borderColor: 'hsl(240, 3.7%, 15.9%)',
                            borderWidth: '1px',
                            borderRadius: '0.375rem',
                            boxShadow: 'none',
                            cursor: 'pointer',
                            '&:hover': {
                                borderColor: 'hsl(240, 3.7%, 15.9%)',
                            },
                            '&:focus': {  
                                borderColor: 'white',
                            },
                        };
                    },
                    option: (styles) => {
                        return {
                            ...styles,
                            color: 'hsl(0 0 98%)',
                            backgroundColor: 'hsl(240 3.7% 15.9%)',
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: 'rgba(240, 240, 240, 0.8)',
                                color: 'hsl(240 3.7% 15.9%)',
                            },
                        };
                    },
                    multiValue: (styles) => {
                        return {
                            ...styles,
                            backgroundColor: 'hsl(240 3.7% 15.9%)',
                        };
                    },
                    multiValueLabel: (styles) => {
                        return {
                            ...styles,
                            backgroundColor: 'hsl(240 3.7% 15.9%)',
                            color: '#FAFAFA',
                            verticalAlign: 'middle',
                        };
                    },
                    placeholder: (styles) => {
                        return {
                            ...styles,
                            color: '#BDBDBD',
                        };
                    },
                }}
            />
        )}
    </div>
);


  
};

export default BeneficiariesDropdown;