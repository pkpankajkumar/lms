import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Grid } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CardGenerator from './CardGenerator'
const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box p={4} sx={{ flexGrow: 1 }}>
         
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <CardGenerator
                  key={1}
                  text="Total Book Issued 102"
                  img
                  url="/book-issue-list"
                  imgUrl="svg/cardArrow.svg"
                  borderColor="#016944"
                  textColor="#282828"
                  iconColor="#A3DBC7"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <CardGenerator
                  key={2}
                  text="Total Book Available 20"
                  img
                  url="/book-available-list"
                  imgUrl="svg/cardArrow.svg"
                  borderColor="#016944"
                  textColor="#282828"
                  iconColor="#A3DBC7"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;