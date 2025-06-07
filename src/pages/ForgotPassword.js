import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper ,Box} from '@mui/material';
import API from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const backgroundImage = 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1350&q=80';

  const handleReset = async () => {
    if (!email.trim() || !newPassword.trim()) return alert('Fill in all fields');
    try {
      const res = await API.get(`/users?email=${email}`);
      if (res.data.length === 0) return alert('Email not registered');
      const user = res.data[0];
      await API.put(`/users/${user.id}`, { ...user, password: newPassword });
      alert('Password reset successful');
      navigate('/login');
    } catch (err) {
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
      <Paper elevation={6} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" gutterBottom>Forgot Password</Typography>
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="New Password" type="password" fullWidth margin="normal" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleReset}>Reset Password</Button>
      </Paper>
    </Container>
     </Box>
  );
};

export default ForgotPassword;