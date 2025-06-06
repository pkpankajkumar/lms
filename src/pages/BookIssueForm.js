import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid
} from '@mui/material';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const BookIssueForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    issuedTo: '',
    fromDate: '',
    toDate: '',
    issueDate: '',
    returnDate: '',
  });

  // Mock data – replace with API calls
  const bookTitles = ['Book A', 'Book B', 'Book C'];
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/bookIssue/${id}`)
        .then(res => setBook(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:5000/bookIssue/${id}`, book);
    } else {
      await axios.post('http://localhost:5000/bookIssue', book);
    }
    navigate('/book-issue-list');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box p={4} sx={{ flexGrow: 1 }}>
        <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          ← Back
        </Button>
        <Typography variant="h4" gutterBottom>{id ? 'Edit Issued Book' : 'Issue Book'}</Typography>
       <form onSubmit={handleSubmit}>
  <Grid container spacing={2}>
    <Grid item xs={12} md={6} sm={6}>
      <FormControl fullWidth>
        <InputLabel>Title</InputLabel>
        <Select
          name="title"
          value={book.title}
          onChange={handleChange}
          label="Title"
        >
          {bookTitles.map((title) => (
            <MenuItem key={title} value={title}>{title}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12} md={6} sm={6}>
      <TextField
        label="Author"
        name="author"
        value={book.author}
        onChange={handleChange}
        fullWidth
      />
    </Grid>

    <Grid item xs={12} md={6} sm={6}>
      <FormControl fullWidth>
        <InputLabel>Issued To</InputLabel>
        <Select
          name="issuedTo"
          value={book.issuedTo}
          onChange={handleChange}
          label="Issued To"
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12} md={6} sm={6}>
      <TextField
        label="Issue Date"
        type="date"
        name="issueDate"
        value={book.issueDate}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    </Grid>

    <Grid item xs={12} md={6} sm={6}>
      <TextField
        label="From Date"
        type="date"
        name="fromDate"
        value={book.fromDate}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    </Grid>

    <Grid item xs={12} md={6} sm={6}>
      <TextField
        label="To Date"
        type="date"
        name="toDate"
        value={book.toDate}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    </Grid>

    <Grid item xs={12} md={6} sm={6}>
      <TextField
        label="Return Date"
        type="date"
        name="returnDate"
        value={book.returnDate}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    </Grid>

    <Grid item xs={12}>
      <Button variant="contained" color="primary" type="submit">
        {id ? 'Update' : 'Issue Book'}
      </Button>
    </Grid>
  </Grid>
</form>

      </Box>
    </Box>
  );
};

export default BookIssueForm;
