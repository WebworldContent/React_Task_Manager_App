import React, {useState} from 'react';
import {TextField, Button, Typography, Box, Alert} from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addUser } from '../../Containers/User';
import { useNavigate, Link } from 'react-router-dom';

export const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, serUsername] = useState('');
	const [error, setError] = useState({});
	const navigate = useNavigate();

	const errorCheck = (email, password, username) => {
		const errors = {};
		if (email === '') {
				errors['email'] = 'Error: email field should not be empty';
		}

		if (password === '') {
				errors['password'] = 'Error: password field should not be empty';
		}

		if (username === '') {
				errors['username'] = 'Error: username field should not be empty';
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

	const signUpUser = (email, password, displayName) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password, displayName).then((userCredential) => { // Signed in
			const user = userCredential.user;
			addUser({name: username, email, userId: user.uid });
			navigate('/');
		}).catch((error) => {
			const errorMessage = error.message.split(':')[1];
      setError((prevError) => ({...prevError, 'Firebase': errorMessage}));
		});
	};

	const handleEmailChange = (event) => {
		const {name, value} = event.target;
		setError((prevError) => ({...prevError, [name]: ''}));
		setEmail(value);
	};

	const handleUsernameChange = (event) => {
		const {name, value} = event.target;
		setError((prevError) => ({...prevError, [name]: ''}));
		serUsername(value);
	}; 

	const handlePasswordChange = (event) => {
		const {name, value} = event.target;
		setError((prevError) => ({...prevError, [name]: ''}));
		setPassword(value);
	};

	const handleOnBlur = (event) => {
		const {name, value} = event.target;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) {
			setError((prevError) => ({...prevError, [name]: 'Error: invalid email'}));
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const newErrors = errorCheck(email, password, username);
		if (errorExist(newErrors).length) {
			setError((error) => ({...error, ...newErrors}));
			return;
		}
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
							{errorExist(error).length ? errorMsg(error) : '' }
							<form onSubmit={handleSubmit}>
									<TextField label="Username" variant="outlined" fullWidth margin="normal"
											value={username}
											name='username'
											onChange={handleUsernameChange}/>
									<TextField label="Email" variant="outlined" fullWidth margin="normal"
											value={email}
											name='email'
											onBlur={handleOnBlur}
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
