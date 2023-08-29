import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();
    const navigate = useNavigate();
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = async(event) => {
      event.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
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
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
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
