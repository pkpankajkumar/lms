import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import API from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

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
    <Container maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" gutterBottom>Forgot Password</Typography>
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="New Password" type="password" fullWidth margin="normal" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleReset}>Reset Password</Button>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;