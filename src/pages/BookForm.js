import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: '', author: '', });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/books/${id}`)
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
      await axios.put(`http://localhost:5000/books/${id}`, book);
    } else {
      await axios.post('http://localhost:5000/books', book);
    }
    navigate('/books');
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
        <Typography variant="h4" gutterBottom>{id ? 'Edit Book' : 'Add Book'}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={book.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Author"
            name="author"
            value={book.author}
            onChange={handleChange}
            fullWidth
            margin="normal"
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