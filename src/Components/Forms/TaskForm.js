import React, {useState, useEffect} from "react";
import {Container, Box, Grid} from '@mui/material';
import { FormControl, TextField, Select, MenuItem, Button, InputLabel } from '@mui/material';
import { addTask, getTask, updateTask } from "../../Containers/FormStore";
import { useNavigate, useParams } from "react-router-dom";
import Alert from '@mui/material/Alert';


export const TaskForm = () => {
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('todo');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const {documentId} = useParams();

  useEffect(() => {
    const getTaskDocIdBased = async () => {
      const {name, status, category} = await getTask(documentId);
      setName(name);
      setStatus(status);
      setCategory(category);
    }

    if (documentId) {
      getTaskDocIdBased();
    }
  }, [documentId]);

  const onStatusChange = (event) => {
    const {value} = event.target;
    setStatus(value);
  };

  const onCategoryChange = (event) => {
    const {value} = event.target;
    setCategory(value);
  };

  const onNameChange = (event) => {
    const {value} = event.target;
    setError(false);
    setName(value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (name === '') {
      setError(true);
      return;
    }
    if (documentId) {
      updateTask({name, status, category, documentId});
    } else {
      addTask({name, status, category});
    }
    navigate('/');
  };

  return (
    <Container maxWidth="md" style={{marginTop: '300px', backgroundColor: '#fff', padding: '50px'}}>
      <div>
        <h1 style={{fontFamily: 'cursive', fontSize: 'xxx-large'}}>Add Tasks</h1>
      </div>
      <form onSubmit={onSubmitHandler}>
        { error && <Alert severity="error">Task Name field is required</Alert> }
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
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            onChange={onCategoryChange}
            value={category}
            >
            <MenuItem value="personel">Personel</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </FormControl>
        
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6} sm={6}>
                <Button type="submit" variant="contained" color="primary" disabled={error}>
                  Submit
                </Button>
              </Grid>
              <Grid item xs={6} md={6} sm={6}>
                <div style={{ textAlign: 'end' }}>
                  <Button onClick={() => navigate(-1)} type="submit" variant="contained" color="primary" disabled={error} end>
                    Back
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>
        
      </form>
    </Container>
    );
};
