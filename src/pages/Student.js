import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const Student = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/users')
      .then((res) => setStudent(res?.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (id) => {
    navigate(`/student/edit/${id}`);
  };

  const filteredStudents = student.filter((st) => {
    const search = searchTerm.toLowerCase();
    return (
      (st.name?.toLowerCase?.().includes(search) ?? false) ||
      (st.email?.toLowerCase?.().includes(search) ?? false) ||
      (typeof st.mobileNo === 'string' && st.mobileNo.toLowerCase().includes(search))
    );
  });

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box p={4} sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Student List
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <TextField
              label="Search by Name, Email, or Mobile"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: '60%' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/student/add')}
              startIcon={<AddIcon />}
            >
              Add Student
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
              {filteredStudents.length > 0 ? (
                filteredStudents.map((st) => (
                  <TableRow key={st.id}>
                    <TableCell>{st.name}</TableCell>
                    <TableCell>{st.email}</TableCell>
                    <TableCell>{st.mobileNo || '-'}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(st.id)}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No matching students found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default Student;
