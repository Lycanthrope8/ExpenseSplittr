import React from 'react';
// import { Box, InputLabel, Option, FormControl, Select, colors } from '@mui/material'
import Select from 'react-select';
// import { OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox } from "@mui/material"

const BeneficiariesDropdown = ({ homeMembers, selectedMembers, setSelectedMembers }) => {
  // const primary = purple[500];
  const handleChange = (selectedMember) => {
    setSelectedMembers(selectedMember);
    console.log(selectedMembers);
};

return (
    <div className="mb-4">
        <label htmlFor="beneficiaries" className="text-sm text-textext">Beneficiaries</label>
        {homeMembers && homeMembers.length > 0 && (
            <Select
                id="beneficiaries"
                isMulti
                options={homeMembers.map((member) => ({ value: member.userId, label: member.name }))}
                value={selectedMembers}
                onChange={handleChange}
                styles={{
                    control : (styles) => {
                        return {
                            ...styles,
                            backgroundColor: 'transaparent',
                            borderColor: 'hsl(240, 3.7%, 15.9%)',
                            borderWidth: '1px',
                            borderRadius: '0.375rem',
                            boxShadow: 'none',
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
                            color: 'rgb(9, 9, 11)',
                            backgroundColor: 'hsl(240 3.7% 15.9%)',
                            '&:hover': {
                                backgroundColor: 'hsl(240 3.7% 15.9% / 80%)',
                                color: '#FAFAFA',
                            },
                        };
                    },
                    multiValue: (styles) => {
                        return {
                            ...styles,
                            backgroundColor: 'hsl(240 3.7% 15.9% / 80%)',
                        };
                    },
                    multiValueLabel: (styles) => {
                        return {
                            ...styles,
                            color: '#FAFAFA',
                        };
                    },
                }}
            />
        )}
    </div>
);


  
};

export default BeneficiariesDropdown;