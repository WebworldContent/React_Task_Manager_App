import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function TaskStatus(props) {
  const [status, setStatus] = React.useState('');
  const handleOnChange = (event) => {
    const {value} = event.target;
    setStatus(value);
    props.taskStatus(value);
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
          label="Status"
          value={status}
        >
          <MenuItem value={0}>
            <em>All Types</em>
          </MenuItem>
          <MenuItem value="todo">Todo</MenuItem>
          <MenuItem value="in_progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
