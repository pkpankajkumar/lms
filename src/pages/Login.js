import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper,Select,MenuItem ,FormControl,InputLabel } from '@mui/material';
import API from '../services/api';

const backgroundImage = 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1350&q=80';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim() || !role.trim()) return alert('Please fill all fields');
    try {
      const res = await API.get(`/users?email=${email}&password=${password}&role=${role}`);
      if (res.data.length > 0) {
        localStorage.setItem('user', JSON.stringify(res.data[0]));

        console.log("res",res)
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
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
    >
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ padding: 4, bgcolor: 'rgba(255,255,255,0.9)' }}>
          <Typography variant="h5" gutterBottom>Library Management System</Typography>
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
          
           <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>User type</InputLabel>
            
            <Select
                name="role"
                label="User type"
                onChange={e => setRole(e.target.value)}
                fullWidth
              >
    
                  <MenuItem key={'user'} value={'user'}>
                   user
                  </MenuItem>
                   <MenuItem key={'admin'} value={'admin'}>
                   admin
                  </MenuItem>
             
              </Select>
              </FormControl>
          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Link to="/register" style={{ textDecoration: 'none' }}><Typography>Register</Typography></Link>
            <Link to="/forgot-password" style={{ textDecoration: 'none' }}><Typography>Forgot Password?</Typography></Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;