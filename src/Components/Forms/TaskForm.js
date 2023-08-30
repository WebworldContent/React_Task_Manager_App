import React, {useState, useEffect} from "react";
import {Container, Box, Grid} from '@mui/material';
import { FormControl, TextField, Select, MenuItem, Button, InputLabel } from '@mui/material';
import { addTask, getTask, updateTask } from "../../Containers/FormStore";
import { useNavigate, useParams } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const TaskForm = () => {
  const [error, setError] = useState({});
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
    const {name, value} = event.target;
    setError((prevError) => ({...prevError, [name]: ''}));
    setCategory(value);
  };

  const errorCheck = (name, category) => {
    const errors = {};
    if (name === '') {
      errors['name'] = 'Name Field should not be Empty';
    }

    if (category === '') {
      errors['category'] = 'Category Field should not be Empty';
    }

    return errors;
  };

  const onNameChange = (event) => {
    const {name, value} = event.target;
    setError((prevError) => ({...prevError, [name]: ''}));
    setName(value.toLowerCase());
  };

  const errorExist = (errors) => {
    const errorCheck = Object.values(errors).filter((data) => data !== '');
    return {
      messages: errorCheck,
      length: errorCheck.length
    };
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const newErrors = errorCheck(name, category);
        if (errorExist(newErrors).length) {
          setError((error) => ({...error, ...newErrors}));
          return;
        }

        if (documentId) {
          updateTask({name, status, category, documentId});
        } else {
          addTask({name, status, category, userId});
        }

        navigate('/');
      }
    });
  };

  const errorMsg = (errors) => {
    return errorExist(errors).messages.map((data) => <Alert key={data} severity="error">{data}</Alert>);
  };

  return (
    <Container maxWidth="md" style={{marginTop: '300px', backgroundColor: '#fff', padding: '50px'}}>
      <div>
        <h1 style={{fontFamily: 'cursive', fontSize: 'xxx-large'}}>Add Tasks</h1>
      </div>
      <form onSubmit={onSubmitHandler}>
        {errorExist(error).length ? errorMsg(error) : '' }
        <FormControl fullWidth margin="normal">
          <TextField
            label="Task Name"
            value={name}
            name="name"
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
            name="category"
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
                <Button type="submit" variant="contained" color="primary" disabled={!!errorExist(error).length}>
                  Submit
                </Button>
              </Grid>
              <Grid item xs={6} md={6} sm={6}>
                <div style={{ textAlign: 'end' }}>
                  <Button onClick={() => navigate('/')} variant="contained" color="primary" >
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
