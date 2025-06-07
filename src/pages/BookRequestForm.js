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
import Header from '../components/Header';

const BookRequestForm = () => {
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
    purpose:'',
    status:'Request'
  });

  // Mock data – replace with API calls
  const bookTitles = ['Book A', 'Book B', 'Book C'];
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];

  const purposeList =[
   //  { id: 1, name: 'I want to book return' },
    { id: 2, name: 'I want to book date extend' },
     { id: 3, name: 'Change other information' },
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


  console.log("book",book)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:5000/bookIssue/${id}`, book);
    } else {
      await axios.post('http://localhost:5000/bookIssue', book);
    }
    navigate('/book-request-list');
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
          <Typography variant="h4" gutterBottom>{id ? 'Edit Book Request/Order' : 'Book Request/Order'}</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} sm={6}>
                <FormControl fullWidth >
                  <InputLabel>Book Title</InputLabel>
                  <Select
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                    label="Book Title"
                  >
                    {bookTitles.map((title) => (
                      <MenuItem key={title} value={title}>{title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Book Author"
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mt: 2 }}
                />

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
            { id &&  (
                 <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Purpose of update</InputLabel>
                  <Select
                    name="purpose"
                    value={book.purpose || ''}
                    onChange={handleChange}
                    label="Issued To"
                  >
                    {purposeList.map((perpose) => (
                      <MenuItem key={perpose.id} value={perpose.id}>
                        {perpose.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                )}
               { id && book.purpose === 1 && (
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
