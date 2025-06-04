import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: '', email: '', mobileNo: '' });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/users/${id}`)
        .then(res => setStudent(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:5000/users/${id}`, student);
    } else {
      await axios.post('http://localhost:5000/users', student);
    }
    navigate('/student');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box p={4} sx={{ flexGrow: 1 }}>
         <Button
        className="mb-4 text-blue-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        ← Back
      </Button>
        <Typography variant="h4" gutterBottom>{id ? 'Edit Student' : 'Add Student'}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={student.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={student.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mobile No"
            name="mobileNo"
            value={student.mobileNo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            {id ? 'Update' : 'Add'} Student
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default StudentForm;