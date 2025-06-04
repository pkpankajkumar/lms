import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';
import API from '../services/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const ChangePassword = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = async () => {
    if (!currentPassword || !newPassword) return alert('All fields required');
    if (currentPassword !== user.password) return alert('Incorrect current password');
    try {
      await API.put(`/users/${user.id}`, { ...user, password: newPassword });
      localStorage.setItem('user', JSON.stringify({ ...user, password: newPassword }));
      alert('Password changed');
      navigate('/dashboard');
    } catch (err) {
      alert('Error updating password');
    }
  };

  return (
    <>


      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box p={4} sx={{ flexGrow: 1 }}>
          <Container maxWidth="xs">
            <Paper elevation={6} sx={{ padding: 4, marginTop: 8 }}>
              <Typography variant="h5" gutterBottom>Change Password</Typography>
              <TextField label="Current Password" type="password" fullWidth margin="normal" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
              <TextField label="New Password" type="password" fullWidth margin="normal" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleChange}>Update Password</Button>
            </Paper>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ChangePassword;