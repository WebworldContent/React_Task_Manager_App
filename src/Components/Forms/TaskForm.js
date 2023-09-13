import React, {useState, useEffect} from "react";
import {Container, Box, Grid} from '@mui/material';
import { FormControl, TextField, Select, MenuItem, Button, InputLabel } from '@mui/material';
import { addTask, getTask, updateTask } from "../../Containers/FormStore";
import { useNavigate, useParams } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {DemoItem } from '@mui/x-date-pickers/internals/demo';

export const TaskForm = () => {
  const [error, setError] = useState({});
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [taskEstimate, setTaskEstimate] = useState(dayjs());
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

  const onCategoryChange = (event) => {
    const {name, value} = event.target;
    setError((prevError) => ({...prevError, [name]: ''}));
    setCategory(value);
  };

  const handleDateAccept = (date) => {
    const extractedDate = date.format();
    setTaskEstimate(extractedDate);
  };

  const errorCheck = (name, category) => {
    const errors = {};
    if (name === '') {
      errors['name'] = 'Error: name Field should not be empty';
    }

    if (category === '') {
      errors['category'] = 'Error: category field should not be empty';
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
          addTask({name, status, category, userId, taskEstimate});
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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem label="Completion Estimate">
            <DatePicker defaultValue={taskEstimate} disablePast onChange={handleDateAccept} />
          </DemoItem>
        </LocalizationProvider>

        <Box style={{marginTop: '10px', fontFamily: 'inherit', color: '#e0e0e0' }}>
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
