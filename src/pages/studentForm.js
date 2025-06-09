import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import Sidebar from '../components/Sidebar';
import API from '../services/api'; // axios instance with baseURL set

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({ name: '', email: '', mobileNo: '',rollNo:'',role:'user',password:''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch student data if id exists (Edit mode)
  useEffect(() => {
    if (!id) return;

    const fetchStudent = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/api/users/${id}`);
        setStudent(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch student data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (id) {
        // Update existing student
        await API.post(`/api/users/update-user/${id}`, student);
      } else {
        // Add new student
        await API.post('/api/users/register', student);
      }
      navigate('/student'); // redirect after success
    } catch (err) {
      console.error(err);
      setError('Failed to save student data.');
    } finally {
      setLoading(false);
    }
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

        <Typography variant="h4" gutterBottom>
          {id ? 'Edit Student' : 'Add Student'}
        </Typography>

        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error" mb={2}>{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={student.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={student.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={student.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Mobile No"
            name="mobileNo"
            inputProps={{ maxLength: 10 }}
            maxLength={10}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
           <TextField
            label="Roll No"
            name="rollNo"
            value={student.rollNo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ maxLength: 5 }}

          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {id ? 'Update' : 'Add'} Student
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default StudentForm;
