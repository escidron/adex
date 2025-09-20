import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function DropDownButton({ label,itens,dropDownSelected,setDropDownSelected,disabled = false }) {

  const handleChange = (event) => {
    if (!disabled) {
      setDropDownSelected(event.target.value);
    }
  };
  return (
    <FormControl sx={{ minWidth: 120,width:'100%',height:'100%' }} size="small">
      <InputLabel id="demo-select-small-label" sx={{top:dropDownSelected != ''?0:'8px'}}>{label}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={dropDownSelected}
        label={label}
        onChange={handleChange}
        disabled={disabled}
        sx={{height:'100%'}}
      >
        {
            itens.map((item)=>(
                
                <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
            ))
        }
        <MenuItem value={99}>
          Other
        </MenuItem>
      </Select>
    </FormControl>
  );
}