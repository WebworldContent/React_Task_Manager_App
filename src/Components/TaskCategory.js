import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function TaskStatus({taskCategory}) {
  const [category, setCategory] = React.useState('');
  const handleOnChange = (event) => {
    const {value} = event.target;
    setCategory(value);
    taskCategory(value);
  };

  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Task Status</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={handleOnChange}
          autoWidth
          label="Category"
          value={category}
        >
          <MenuItem value={0}>
            <em>All Category</em>
          </MenuItem>
          <MenuItem value="personel">Personel</MenuItem>
          <MenuItem value="professional">Professional</MenuItem>
          <MenuItem value="others">Others</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
