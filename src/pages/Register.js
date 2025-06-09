import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api'; // Your configured axios instance

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email.trim() || !password.trim() || !name.trim() || !mobileNo.trim()) {
      return alert('Please fill in all fields');
    }

    try {
      // Check if email already exists
      // const res = await API.get(`/api/users?email=${email}`);
      // if (res.data.length > 0) {
      //   return alert('Email already registered');
      // }

      // Register new user
      await API.post('/api/users/register', {
        name,
        email,
        password,
        mobileNo,
        rollNo,
        role: 'user', // Default role
      });

      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      alert('Network error during registration');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom textAlign="center">
            Register
          </Typography>

          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Mobile No"
            fullWidth
            margin="normal"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            required
            inputProps={{ maxLength: 10 }}
          />
          <TextField
            label="Roll No"
            fullWidth
            margin="normal"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            inputProps={{ maxLength: 5 }}
            required
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleRegister}
          >
            Register
          </Button>

          <Box mt={2} textAlign="center">
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography variant="body2">
                Already have an account? Login
              </Typography>
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
