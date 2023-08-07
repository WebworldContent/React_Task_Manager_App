import React from "react";
import Container from '@mui/material/Container';
import { FormControl, TextField, Select, MenuItem, Button, InputLabel } from '@mui/material';

export const TaskForm = () => {
    return (
      <Container maxWidth="md" style={{marginTop: '300px', backgroundColor: '#fff', padding: '50px'}}>
        <div>
          <h1 style={{fontFamily: 'cursive', fontSize: 'xxx-large'}}>Add Tasks</h1>
        </div>
        <form>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Task Name"
              variant="outlined"
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select label="Status">
              <MenuItem value="todo">Todo</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" >
            Submit
          </Button>
        </form>
      </Container>
      );
};
