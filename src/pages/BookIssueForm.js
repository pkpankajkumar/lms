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
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import API from '../services/api'; // axios instance with baseURL

const BookIssueForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookAll, setBookAll] = useState([]);

  const [book, setBook] = useState({
    bookId: '',
    author: '',
    issuedTo: '',
    fromDate: '',
    toDate: '',
    issueDate: '',
    returnDate: '',
    purpose: '',
    isBookIssued: 'NO',
    status: ''
  });
  const [users, setUsers] = useState([]);

  const purposeList = [
    { id: 1, name: 'I want to book return' },
    { id: 2, name: 'I want to book date extend' },
    { id: 3, name: 'Change other information' },
    { id: 4, name: 'Request Reject' },
    { id: 5, name: 'Request Accept' },
  ];

  useEffect(() => {
    API.get('/api/books')
      .then((res) => setBookAll(res?.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    API.get('/api/users')
      .then((res) => setUsers(res?.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (id) {
      API.get(`/api/book-issues/${id}`)
        .then(res => setBook(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newRequest;

    if (book.returnDate !== '' && (book.purpose === 1 || book.purpose == "1")) {
      newRequest = { ...book, isBookIssued: 'NO', status: 'Returned' };
    } else if (book.purpose === 4 || book.purpose == "4") {
      newRequest = { ...book, isBookIssued: 'NO', status: 'Rejected' };
    } else {
      newRequest = { ...book, isBookIssued: 'YES', status: 'Issued' };
    }

    try {
      if (id) {
        await API.put(`/api/book-issues/${id}`, newRequest);
      } else {
        await API.post('/api/book-issues/issue-book', newRequest);
      }
      navigate('/book-issue-list');
    } catch (error) {
      console.error('Error submitting form:', error);
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
            {id ? 'Return/Extend Issued Book' : 'Issue Book'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Book Title</InputLabel>
                  <Select
                    name="bookId"
                    value={book.bookId}
                    onChange={handleChange}
                    label="Book Title"
                  >
                    {bookAll.map((bk) => (
                      <MenuItem key={bk.id} value={bk.id}>{bk.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
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

                <TextField
                  label="Issue Date"
                  type="date"
                  name="issueDate"
                  value={book.issueDate}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ mt: 2 }}
                />

                <TextField
                  label="From Date"
                  type="date"
                  name="fromDate"
                  value={book.fromDate}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ mt: 2 }}
                />

                <TextField
                  label="To Date"
                  type="date"
                  name="toDate"
                  value={book.toDate}
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
                      value={book.purpose || ''}
                      onChange={handleChange}
                      label="Purpose of update"
                    >
                      {purposeList.map((perpose) => (
                        <MenuItem key={perpose.id} value={perpose.id}>
                          {perpose.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {id && book.purpose === 1 && (
                  <TextField
                    label="Return Date"
                    type="date"
                    name="returnDate"
                    value={book.returnDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ mt: 2 }}
                  />
                )}

                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default BookIssueForm;
