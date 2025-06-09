import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import Sidebar from '../components/Sidebar';
import API from '../services/api'; // assumed to be axios instance with baseURL set

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: '', author: '' });

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await API.get(`api/books/${id}`);
      setBook(res.data);
    } catch (err) {
      console.error('Failed to fetch book:', err);
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/api/books/${id}`, book);
      } else {
        await API.post('/api/books/add-book', book);
      }
      navigate('/books');
    } catch (err) {
      console.error('Failed to save book:', err);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box p={4} sx={{ flexGrow: 1 }}>
        <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          ← Back
        </Button>
        <Typography variant="h4" gutterBottom>
          {id ? 'Edit Book' : 'Add Book'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={book.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Author"
            name="author"
            value={book.author}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            {id ? 'Update' : 'Add'} Book
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default BookForm;
