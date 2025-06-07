import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const Header = () => {

  return (
    <AppBar position="static" color="primary" sx={{ zIndex: 1201 }}>
        <Typography align='center' variant="h6" >
          Library Management System
        </Typography>
    </AppBar>
  );
};

export default Header;