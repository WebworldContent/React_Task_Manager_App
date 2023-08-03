import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function TaskStatus() {

  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Task Status</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={console.log}
          autoWidth
          label="Age"
        >
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          <MenuItem>Twenty</MenuItem>
          <MenuItem>Twenty one</MenuItem>
          <MenuItem>Twenty one and a half</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
