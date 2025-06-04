import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>
    <Header />
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box p={4} sx={{ flexGrow: 1 }}>
        <Typography variant="h4">Welcome, {user?.email}</Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={() => navigate('/books')}>Manage Books</Button>
          <Button variant="outlined" color="secondary" sx={{ ml: 2 }} onClick={() => { localStorage.clear(); navigate('/'); }}>Logout</Button>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default Dashboard;