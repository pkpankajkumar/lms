import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // Define all possible menu items
  const allMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Student', icon: <AccountCircleIcon />, path: '/student' },
    { text: 'Books', icon: <MenuBookIcon />, path: '/books' },
    { text: 'Book Issue', icon: <AddIcon />, path: '/book-issue-list' },
    { text: 'Book Available for Issue', icon: <CheckCircleIcon />, path: '/book-available-list' },
    { text: 'Book Request/Order', icon: <CheckCircleIcon />, path: '/book-request-list' },
    { text: 'Change Password', icon: <VpnKeyIcon />, path: '/change-password' },
  ];

  // Filter menu items based on role
  const menuItems = user?.role === 'admin'
    ? allMenuItems
    : allMenuItems.filter(item =>
        ['Dashboard', 'Book Available for Issue', 'Book Request/Order', 'Change Password'].includes(item.text)
      );

  return (
    <Box
      sx={{
        width: open ? 200 : 60,
        transition: 'width 0.3s',
        overflowX: 'hidden',
        height: '100vh',
        backgroundColor: 'primary.main',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&:hover': { width: 200 },
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding onClick={() => navigate(item.path)}>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        <ListItem disablePadding onClick={() => navigate('/login')}>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
              <AccountCircleIcon />
            </ListItemIcon>
            {open && <ListItemText primary={user?.email} />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => { localStorage.clear(); navigate('/'); }}>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>
              <LogoutIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
