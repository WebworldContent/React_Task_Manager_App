import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const auth = getAuth();
    const navigate = useNavigate();
  
    const handleEmailChange = (event) => {
      const {name, value} = event.target;
      setError((prevError) => ({...prevError, [name]: ''}));
      setEmail(value);
    };

    const handleOnBlur = (event) => {
      const {name, value} = event.target;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError((prevError) => ({...prevError, [name]: 'Error: invalid email'}));
      }
    }
  
    const handlePasswordChange = (event) => {
      const {name, value} = event.target;
      setError((prevError) => ({...prevError, [name]: ''}));
      setPassword(value);
    };

    const errorCheck = (email, password) => {
      const errors = {};
      if (email === '') {
        errors['email'] = 'Error: email field should not be empty';
      }
  
      if (password === '') {
        errors['password'] = 'Error: password field should not be empty';
      }
  
      return errors;
    };

    const errorExist = (errors) => {
      const errorCheck = Object.values(errors).filter((data) => data !== '');
      return {
        messages: errorCheck,
        length: errorCheck.length
      };
    };

    const errorMsg = (errors) => {
      return errorExist(errors).messages.map((data) => <Alert key={data} severity="error">{data}</Alert>);
    };  
  
    const handleSubmit = async(event) => {
      event.preventDefault();

      const newErrors = errorCheck(email, password);
      if (errorExist(newErrors).length) {
        setError((error) => ({...error, ...newErrors}));
        return;
      }
      
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } catch (error) {
        const errorMessage = error.message.split(':')[1];
        setError((prevError) => ({...prevError, 'Firebase': errorMessage}));
      }
    };
  
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="rgba(0, 0, 0, 0.5)"
    >
      <Box
        bgcolor="white"
        p={3}
        borderRadius={5}
        boxShadow={3}
        width={400}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        {errorExist(error).length ? errorMsg(error) : '' }
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            name="email"
            onBlur={handleOnBlur}
            onChange={handleEmailChange}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            name="password"
            onChange={handlePasswordChange}
          />
          <Button type="submit" variant="contained" color="primary" style={{marginTop: '30px'}} fullWidth>
            Sign In
          </Button>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to='/register'>
              Go To Register
            </Link>
          </div>
        </form>
      </Box>
    </Box>
  );
};
