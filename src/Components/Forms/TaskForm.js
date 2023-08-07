import React, {useState} from "react";
import Container from '@mui/material/Container';
import { FormControl, TextField, Select, MenuItem, Button, InputLabel } from '@mui/material';
import { addTask } from "../../Containers/FormStore";

export const TaskForm = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('todo');

  const onStatusChange = (event) => {
    const {value} = event.target;
    setStatus(value);
  };

  const onNameChange = (event) => {
    const {value} = event.target;
    setName(value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('submit called');
    addTask(name, status);
  };

  console.log(name, status);
  return (
    <Container maxWidth="md" style={{marginTop: '300px', backgroundColor: '#fff', padding: '50px'}}>
      <div>
        <h1 style={{fontFamily: 'cursive', fontSize: 'xxx-large'}}>Add Tasks</h1>
      </div>
      <form onSubmit={onSubmitHandler}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Task Name"
            value={name}
            onChange={onNameChange}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            onChange={onStatusChange}
            value={status}
            >
            <MenuItem value="todo">Todo</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
    );
};
