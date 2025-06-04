import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api'; // assumes API is axios instance pointing to json-server

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
const backgroundImage = 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1350&q=80';

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) return alert('Please fill in all fields');
    try {
      const res = await API.get(`/users?email=${email}`);
      if (res.data.length > 0) return alert('Email already registered');
      await API.post('/users', { email, password, role: 'user' });
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
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
