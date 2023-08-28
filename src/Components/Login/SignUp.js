import React, {useState} from 'react';
import {TextField, Button, Typography, Box} from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addUser } from '../../Containers/User';
import { useNavigate, Link } from 'react-router-dom';

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, serUsername] = useState('');
    const navigate = useNavigate();

    const signUpUser = (email, password, displayName) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password, displayName).then((userCredential) => { // Signed in
            const user = userCredential.user;
            addUser({name: username, email, userId: user.uid });
            navigate('/');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleUsernameChange = (event) => {
        serUsername(event.target.value);
    }; 

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        signUpUser(email, password, username);
    };


    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="rgba(0, 0, 0, 0.5)">
            <Box bgcolor="white"
                p={3}
                borderRadius={5}
                boxShadow={3}
                width={400}>
                <Typography variant="h4" align="center" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField label="Username" variant="outlined" fullWidth margin="normal"
                        value={username}
                        name='username'
                        onChange={handleUsernameChange}/>
                    <TextField label="Email" variant="outlined" fullWidth margin="normal"
                        value={email}
                        name='name'
                        onChange={handleEmailChange}/>
                    <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal"
                        value={password}
                        name='password'
                        onChange={handlePasswordChange}/>
                    <Button type="submit" variant="contained" color="primary"
                        style={
                            {marginTop: '30px'}
                        }
                        fullWidth>
                        Sign Up
                    </Button>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Link to='/login'>
                            Go To Login
                        </Link>
                    </div>
                </form>
            </Box>
        </Box>
    );
};
