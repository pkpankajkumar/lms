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
  Grid,
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import API from '../services/api'; // Axios instance with baseURL

const BookRequestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [bookRequest, setBookRequest] = useState({
    bookId: '',
    author: '',
    issuedTo: user?.id,
    fromDate: '',
    toDate: '',
    issueDate: '',
    returnDate: '',
    purpose: '',
    status: 'Request',
  });

  const [booksAvailabs, setBooksAvailabs] = useState([]);

  const purposeList = [
    // { id: 1, name: 'I want to book return' },
    { id: 2, name: 'I want to book date extend' },
    { id: 3, name: 'Change other information' },
  ];

  // Fetch books
  useEffect(() => {
    API.get('/api/available-books')
      .then((res) => setBooksAvailabs(res?.data))
      .catch((err) => console.error(err));
  }, []);

  // If editing, fetch book request
  useEffect(() => {
    if (id) {
      API.get(`/api/book-issues/${id}`)
        .then((res) => setBookRequest(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setBookRequest({ ...bookRequest, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/api/book-issues/${id}`, bookRequest);
      } else {
        await API.post('/api/book-issues/issue-book', bookRequest);
      }
      navigate('/book-request-list');
    } catch (err) {
      console.error('Error submitting request:', err);
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box p={4} sx={{ flexGrow: 1 }}>
          <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
            ← Back
          </Button>
          <Typography variant="h4" gutterBottom>
            {id ? 'Edit Book Request/Order' : 'Book Request/Order'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Book Title</InputLabel>
                  <Select
                    name="bookId"
                    value={bookRequest.bookId}
                    onChange={handleChange}
                    label="Book Title"
                  >
                    {booksAvailabs.map((book) => (
                      <MenuItem key={book.id} value={book.id}>
                        {book.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Issue Date"
                  type="date"
                  name="issueDate"
                  value={bookRequest.issueDate}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ mt: 2 }}
                />

                <TextField
                  label="From Date"
                  type="date"
                  name="fromDate"
                  value={bookRequest.fromDate}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ mt: 2 }}
                />

                <TextField
                  label="To Date"
                  type="date"
                  name="toDate"
                  value={bookRequest.toDate}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ mt: 2 }}
                />

                {id && (
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Purpose of update</InputLabel>
                    <Select
                      name="purpose"
                      value={bookRequest.purpose || ''}
                      onChange={handleChange}
                      label="Purpose of update"
                    >
                      {purposeList.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                          {p.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {id && bookRequest.purpose === 1 && (
                  <TextField
                    label="Return Date"
                    type="date"
                    name="returnDate"
                    value={bookRequest.returnDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ mt: 2 }}
                  />
                )}

                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                  {id ? 'Update' : 'Submit Request/Order'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default BookRequestForm;
