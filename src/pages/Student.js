import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const Student = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(res => setStudent(res?.data))
      .catch(err => console.error(err));
  }, []);

  const handleEdit = (id) => {
    navigate(`/student/edit/${id}`);
  };

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box p={4} sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>Student List</Typography>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button variant="contained" color="primary" onClick={() => navigate('/student/add')}>
              <AddIcon/>Add Student
            </Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile No</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {student.map(st => (
                <TableRow key={st.id}>
                  <TableCell>{st.name}</TableCell>
                  <TableCell>{st.email}</TableCell>
                  <TableCell>{st.mobileNo || '-'}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleEdit(st.id)}>
                     <EditIcon/>Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default Student;