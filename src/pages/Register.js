import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api'; // assumes API is axios instance pointing to json-server

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [name, setName] = useState('');


  const navigate = useNavigate();
  const backgroundImage = 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1350&q=80';

  const handleRegister = async () => {
    if (!email.trim() || !password.trim() || !name.trim() || !mobileNo.trim()) return alert('Please fill in all fields');
    try {
      const res = await API.get(`/users?email=${email}`);
      if (res.data.length > 0) return alert('Email already registered');
      await API.post('/users', { email,name, password, role: 'user',mobileNo });
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      alert('Network error during registration');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >  <Container maxWidth="xs">
        <Paper elevation={6} sx={{ padding: 4, backdropFilter: 'blur(4px)', backgroundColor: 'rgba(255,255,255,0.85)' }}>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            name="name"
            onChange={e => setName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            name="email"
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <TextField
            label="Mobile No"
            type="text"
            fullWidth
            margin="normal"
            name="mobileNo"
            value={mobileNo}
            onChange={e => setMobileNo(e.target.value)}
          />
          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
            Register
          </Button>
          <Box mt={2} textAlign="center">
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography>Already have an account? Login</Typography>
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
